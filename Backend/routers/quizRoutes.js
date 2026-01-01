const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const multer = require("multer");

const authFacultyOrAdmin = require("../middleware/authFacultyOrAdmin");
const authFaculty = require("../middleware/authFaculty");
const authSuperAdmin = require("../middleware/authSuperAdmin");
const authUser = require("../middleware/authUser");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

router.post("/generate-certificate", authUser, quizController.generateCertificate);

router.post("/create-quiz", authFaculty, upload.any(), quizController.createQuiz);

router.get("/all-quizzes", quizController.getAllQuizzes);

router.get("/attempted-quizzes", authUser, quizController.getAllAttemptedQuizzes);

router.get("/my-quizzes", authFaculty, quizController.getFacultyQuizzes);

router.get("/my-registered-quizzes", authUser, quizController.getStudentsRegisteredQuizzes);

router.get(
  "/department/:departmentName",
  authSuperAdmin,
  quizController.getQuizzesByDepartment
);

router.get(
  "/:quizId/registeredStudent",
  quizController.QuizRegisteredStudents
);

router.get(
  "/:quizId/student",
  authUser,
  quizController.getAttemptedQuizByStudent
);

router.post("/:quizId/start", authUser, quizController.QuizAttempt);

router.get("/:quizId/start-timer", authFaculty, quizController.startTimer);

router.post("/:quizId/start-timer", authFaculty, quizController.startQuizTimer);

router.get("/:quizId/timer", quizController.getQuizTimer);

router.post("/:quizId/submit", authUser, quizController.submitQuiz);

router.post(
  "/:quizId/register-student",
  authUser,
  quizController.registerStudentForQuiz
);

router.put("/:quizId", authFaculty, quizController.updateQuizById);

router.delete("/:quizId", authFaculty, quizController.deleteQuizById);

router.get("/:quizId", quizController.getQuizById);

module.exports = router;
