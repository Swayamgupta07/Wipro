import express from "express";
import { renderHome, renderAbout, renderContact } from "../controllers/pageController.js";

const router = express.Router();

router.get("/", renderHome);
router.get("/about", renderAbout);
router.get("/contact", renderContact);

export default router;
