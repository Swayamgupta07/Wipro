import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pageRoutes from "./routes/pageRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", pageRoutes);
app.use("/", studentRoutes);

app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
});
