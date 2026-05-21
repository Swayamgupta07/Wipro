const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);
router.post('/add', studentController.createStudent);
router.get('/view/:id', studentController.viewStudent);
router.put('/update/:id', studentController.updateStudent);
router.delete('/delete/:id', studentController.deleteStudent);

module.exports = router;
