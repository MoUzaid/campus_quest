const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const multer = require('multer');
const authFacultyOrSuperAdmin = require('../middleware/authFacultyOrAdmin');
const authFaculty = require('../middleware/authFaculty');
const authSuperAdmin = require('../middleware/authSuperAdmin');
const auth = require('../middleware/auth');


const upload = multer({
 storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024 
  }
});

router.post('/create-quiz',authFacultyOrSuperAdmin,upload.any(), quizController.createQuiz);

router.get('/all-quizzes',quizController.getAllQuizzes);

router.get('/:quizId', quizController.getQuizById);

router.put('/:quizId',authFaculty,quizController.updateQuizById);

router.delete('/:quizId',authFaculty,quizController.deleteQuizById);

router.post('/:quizId/register-student',auth, quizController.registerStudentForQuiz);

router.get('/department/:departmentName',authSuperAdmin,quizController.getQuizzesByDepartment);

router.post('/:quizId/submit',auth,quizController.submitQuiz);

router.get('/:quizId/start',auth, quizController.QuizAttempt);

module.exports = router;
