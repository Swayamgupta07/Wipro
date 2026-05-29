const { Router } = require('express');
const pageController = require('../controllers/pageController');
const { requireAuth, authorize } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', pageController.home_get);
router.get('/about', pageController.about_get);
router.get('/contact', pageController.contact_get);

router.get('/students', requireAuth, authorize('teacher'), pageController.students_get);

router.get('/add-student', requireAuth, authorize('student'), pageController.add_student_get);
router.post('/add-student', requireAuth, authorize('student'), pageController.add_student_post);

module.exports = router;
