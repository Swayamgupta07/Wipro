const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);

router.get('/add', studentController.showAddForm);
router.post('/add', studentController.addStudent);

router.get('/edit/:id', studentController.showEditForm);
router.put('/edit/:id', studentController.updateStudent);

router.delete('/delete/:id', studentController.deleteStudent);

module.exports = router;
