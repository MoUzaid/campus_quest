// // const express = require("express");
// // const router = express.Router();
// // const quizController = require("../controllers/quizController");
// // const multer = require("multer");

// // const authFacultyOrAdmin = require("../middleware/authFacultyOrAdmin");
// // const authFaculty = require("../middleware/authFaculty");
// // const authSuperAdmin = require("../middleware/authSuperAdmin");
// // const authUser = require("../middleware/authUser");

// // const upload = multer({
// //   storage: multer.memoryStorage(),
// //   limits: {
// //     fileSize: 1 * 1024 * 1024,
// //   },
// // });

// // router.post('/generate-certificate', quizController.generateCertificate);

// // router.post(
// //   "/create-quiz",
// //   authFaculty,
// //   upload.any(),
// //   quizController.createQuiz
// // );

// // router.get('/all-quizzes',quizController.getAllQuizzes);

// // router.get('/:quizId', quizController.getQuizById);

// // router.put('/:quizId',authFaculty,quizController.updateQuizById);

// // router.delete('/:quizId',authFaculty,quizController.deleteQuizById);

// // router.post('/:quizId/register-student',authUser, quizController.registerStudentForQuiz);

// // router.get('/department/:departmentName',authSuperAdmin,quizController.getQuizzesByDepartment);

// // router.post('/:quizId/submit',authUser,quizController.submitQuiz);

// // router.get('/:quizId/start',authUser, quizController.QuizAttempt);

// // router.get("/:quizId/start-timer",authFaculty,quizController.startTimer);

// // router.post("/:quizId/start-timer", quizController.startQuizTimer);

// // router.get("/:quizId/timer", quizController.getQuizTimer);



// // router.get(
// //   "/my-registered-quizzes",
// //   authUser,
// //   quizController.getStudentsRegisteredQuizzes
// // );

// // module.exports = router;





// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// /* ================= CONTROLLER ================= */
// const quizController = require("../controllers/quizController");

// /* ================= MIDDLEWARES ================= */
// const authFaculty = require("../middleware/authFaculty");
// const authSuperAdmin = require("../middleware/authSuperAdmin");
// const authUser = require("../middleware/authUser");

// /* ================= MULTER CONFIG ================= */
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 1 * 1024 * 1024, // 1 MB
//   },
// });

// /* =================================================
//    📄 CERTIFICATE (STUDENT)
// ================================================= */
// router.post(
//   "/generate-certificate",
//   authUser,
//   quizController.generateCertificate
// );

// /* =================================================
//    👨‍🎓 STUDENT → ATTEMPT HISTORY
//    ⚠️ STATIC ROUTES FIRST
// ================================================= */
// router.get(
//   "/attempted-quizzes",
//   authUser,
//   quizController.getAllAttemptedQuizzes
// );

// router.get(
//   "/my-registered-quizzes",
//   authUser,
//   quizController.getStudentsRegisteredQuizzes
// );

// /* =================================================
//    📝 QUIZ LISTING
// ================================================= */
// router.get(
//   "/all-quizzes",
//   quizController.getAllQuizzes
// );

// /* =================================================
//    📝 QUIZ CREATION (FACULTY)
// ================================================= */
// router.post(
//   "/create-quiz",
//   authFaculty,
//   upload.any(),
//   quizController.createQuiz
// );

// /* =================================================
//    🏫 SUPER ADMIN
// ================================================= */
// router.get(
//   "/department/:departmentName",
//   authSuperAdmin,
//   quizController.getQuizzesByDepartment
// );

// /* =================================================
//    ⚠️ DYNAMIC QUIZ ROUTES (KEEP AT BOTTOM)
// ================================================= */

// /* ===== QUIZ CRUD ===== */
// router.get(
//   "/:quizId",
//   quizController.getQuizById
// );

// router.put(
//   "/:quizId",
//   authFaculty,
//   quizController.updateQuizById
// );

// router.delete(
//   "/:quizId",
//   authFaculty,
//   quizController.deleteQuizById
// );

// /* ===== STUDENT ACTIONS ===== */
// router.post(
//   "/:quizId/register-student",
//   authUser,
//   quizController.registerStudentForQuiz
// );

// router.post(
//   "/:quizId/attempt",
//   authUser,
//   quizController.QuizAttempt
// );

// router.post(
//   "/:quizId/submit",
//   authUser,
//   quizController.submitQuiz
// );

// router.get(
//   "/:quizId/attempted",
//   authUser,
//   quizController.getAttemptedQuizByStudent
// );

// /* ===== TIMER ===== */
// router.get(
//   "/:quizId/start-timer",
//   authFaculty,
//   quizController.startTimer
// );

// router.post(
//   "/:quizId/start-timer",
//   authFaculty,
//   quizController.startQuizTimer
// );

// router.get(
//   "/:quizId/timer",
//   quizController.getQuizTimer
// );

// /* ===== FACULTY ===== */
// router.get(
//   "/:quizId/registered-students",
//   authFaculty,
//   quizController.QuizRegisteredStudents
// );

// module.exports = router;




const express = require("express");
const router = express.Router();
const multer = require("multer");

/* ================= CONTROLLER ================= */
const quizController = require("../controllers/quizController");

/* ================= MIDDLEWARES ================= */
const authFaculty = require("../middleware/authFaculty");
const authSuperAdmin = require("../middleware/authSuperAdmin");
const authUser = require("../middleware/authUser");

/* ================= MULTER CONFIG ================= */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, // 1 MB
  },
});

/* =================================================
   📄 CERTIFICATE (STUDENT)
================================================= */
router.post(
  "/generate-certificate",
  authUser,
  quizController.generateCertificate
);

/* =================================================
   👨‍🎓 STUDENT → ATTEMPT HISTORY
   ⚠️ STATIC ROUTES FIRST
================================================= */
router.get(
  "/attempted-quizzes",
  authUser,
  quizController.getAllAttemptedQuizzes
);

router.get(
  "/my-registered-quizzes",
  authUser,
  quizController.getStudentsRegisteredQuizzes
);

/* =================================================
   📝 QUIZ LISTING
================================================= */
router.get(
  "/all-quizzes",
  quizController.getAllQuizzes
);

/* =================================================
   📝 QUIZ CREATION (FACULTY)
================================================= */
router.post(
  "/create-quiz",
  authFaculty,
  upload.any(),
  quizController.createQuiz
);

/* =================================================
   🏫 SUPER ADMIN
================================================= */
router.get(
  "/department/:departmentName",
  authSuperAdmin,
  quizController.getQuizzesByDepartment
);

/* =================================================
   ⚠️ DYNAMIC QUIZ ROUTES (KEEP AT BOTTOM)
================================================= */

/* ===== QUIZ CRUD ===== */
router.get(
  "/:quizId",
  quizController.getQuizById
);

router.put(
  "/:quizId",
  authFaculty,
  quizController.updateQuizById
);

router.delete(
  "/:quizId",
  authFaculty,
  quizController.deleteQuizById
);

/* ===== STUDENT ACTIONS ===== */
router.post(
  "/:quizId/register-student",
  authUser,
  quizController.registerStudentForQuiz
);

router.post(
  "/:quizId/attempt",
  authUser,
  quizController.QuizAttempt
);

router.post(
  "/:quizId/submit",
  authUser,
  quizController.submitQuiz
);

router.get(
  "/:quizId/attempted",
  authUser,
  quizController.getAttemptedQuizByStudent
);

/* ===== TIMER ===== */
router.get(
  "/:quizId/start-timer",
  authFaculty,
  quizController.startTimer
);

router.post(
  "/:quizId/start-timer",
  authFaculty,
  quizController.startQuizTimer
);

router.get(
  "/:quizId/timer",
  quizController.getQuizTimer
);

/* ===== FACULTY ===== */
router.get(
  "/:quizId/registered-students",
  authFaculty,
  quizController.QuizRegisteredStudents
);

module.exports = router;