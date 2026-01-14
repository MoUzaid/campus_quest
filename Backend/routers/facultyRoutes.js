const express = require("express");
const router = express.Router();
const authSuperAdmin = require("../middleware/authSuperAdmin");
const authFaculty = require("../middleware/authFaculty");
const authFacultyOrAdmin =require("../middleware/authFacultyOrAdmin");

const {
  addFaculty,
  loginFaculty,
  changePassword,
  deleteFaculty,
  getAllFaculty,
  refreshToken,
  forgotPassword,       
  resetPassword,
  getFacultyProfile,
  updateFaculty ,
  getFacultyQuizzes,
  getFacultyStudentsOverview,
  getStudentRegisteredQuizzesByFaculty ,
  getStudentQuizAttemptsByFaculty ,  
  getFacultyOwnQuizzes,   
  getQuizRegisteredStudents,
  getQuizAttemptedStudents 
} = require("../controllers/facultyController");


// router.post("/add", authFacultyOrAdmin, addFaculty);

router.post("/add",addFaculty);
router.post("/login",loginFaculty);
router.put("/update-password",authFaculty,changePassword );
router.delete("/delete/:facultyId",authSuperAdmin,deleteFaculty);
// router.get("/all",getAllFaculty);
router.get("/all", authFacultyOrAdmin, getAllFaculty);

router.get(
  "/:facultyId/quizzes",
  authSuperAdmin,
  getFacultyQuizzes
);

router.get(
  "/students-overview",
  authFaculty,
  getFacultyStudentsOverview
);
router.post("/refresh_token",refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", authFaculty, getFacultyProfile);

router.put(
  "/update/:facultyId",
  authFacultyOrAdmin,
  updateFaculty
);

router.get(
  "/student/:studentId/registered-quizzes",
  authFaculty,
  getStudentRegisteredQuizzesByFaculty
);

router.get(
  "/student/:studentId/quiz-attempts",
  authFaculty,
  getStudentQuizAttemptsByFaculty
  
);

// facultyRoutes.js
router.get(
  "/my-quizzes",
  authFaculty,
  getFacultyOwnQuizzes
);

router.get(
  "/quiz/:quizId/registered-students",
  authFaculty,
  getQuizRegisteredStudents
);

router.get(
  "/quiz/:quizId/attempted-students",
  authFaculty,
  getQuizAttemptedStudents
);







module.exports = router;

