import express from "express";
import { 
    getAllStudents, 
    renderAddForm, 
    saveStudent, 
    renderEditForm, 
    updateStudent, 
    deleteStudent 
} from "../controllers/studentController.js";
import { validateStudent } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/students", getAllStudents);
router.get("/student/add", renderAddForm);
router.post("/student/save", validateStudent, saveStudent);
router.get("/students/edit/:id", renderEditForm);
router.post("/students/update/:id", validateStudent, updateStudent);
router.get("/students/delete/:id", deleteStudent);

export default router;
