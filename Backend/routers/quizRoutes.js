const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const multer = require('multer');
const authFacultyOrAdmin = require('../middleware/authFacultyOrAdmin');
const authFaculty = require('../middleware/authFaculty');
const authSuperAdmin = require('../middleware/authSuperAdmin');
const auth = require('../middleware/auth');


const upload = multer({
 storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024 
  }
});

router.post('/generate-certificate', quizController.generateCertificate);

router.post('/create-quiz',authFaculty,upload.any(), quizController.createQuiz);

router.get('/all-quizzes',quizController.getAllQuizzes);

router.get(
  "/my-quizzes",
  authFaculty,
  quizController.getFacultyQuizzes
);

router.get('/:quizId', quizController.getQuizById);

router.put('/:quizId',authFaculty,quizController.updateQuizById);

router.delete('/:quizId',authFaculty,quizController.deleteQuizById);

router.post('/:quizId/register-student',auth, quizController.registerStudentForQuiz);

router.get('/department/:departmentName',authSuperAdmin,quizController.getQuizzesByDepartment);

router.post('/:quizId/submit',auth,quizController.submitQuiz);

router.get('/:quizId/start',auth, quizController.QuizAttempt);

router.get("/:quizId/start-timer",authFaculty,quizController.startTimer);

router.post("/:quizId/start-timer", quizController.startQuizTimer);

router.get("/:quizId/timer", quizController.getQuizTimer);

module.exports = router;
