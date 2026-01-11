const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const Quiz = require("../models/quizModel");
/* ================= REGISTER STUDENT ================= */
exports.registerStudent = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body)

    if (!email.includes("@student.iul.ac.in")) {
      return res.status(400).json({ message: "Enter University Email" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const student = await Student.create({
      ...req.body,
      emailVerificationCode: otp,
      emailVerificationExpires: Date.now() + 10 * 60 * 1000,
    });

    const accessToken = jwt.sign(
      { id: student._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id: student._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    student.refreshToken = refreshToken;
    await student.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await sendEmail(
      student.email,
      "Verify your Campus Quest email",
      `
      <h2>Email Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>Valid for 10 minutes.</p>
      `
    );

    res.status(201).json({
      message: "Registration successful. Verification code sent to email.",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ================= RESEND OTP ================= */
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ msg: "Student not found" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    student.emailVerificationCode = otp;
    student.emailVerificationExpires = Date.now() + 10 * 60 * 1000;
    await student.save();

    await sendEmail(
      email,
      "Verify your Campus Quest email",
      `<h2>Your OTP: ${otp}</h2>`
    );

    res.json({ msg: "Verification code sent" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ================= VERIFY EMAIL ================= */
exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const student = await Student.findOne({ email });

    if (!student) return res.status(404).json({ msg: "Student not found" });

    if (
      student.emailVerificationCode !== otp ||
      student.emailVerificationExpires < Date.now()
    ) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    student.emailVerified = true;
    student.emailVerificationCode = null;
    student.emailVerificationExpires = null;

    await student.save();

    res.json({ msg: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};




exports.loginStudent = async (req, res) => {
  try {
    console.log(req.body);
    const student = await Student.findOne({ email: req.body.email });
    if (!student) return res.status(404).json({ msg: "Student not found" });

    if (!student.emailVerified) {
      return res.status(403).json({ msg: "Please verify your email first" });
    }

    const match = await bcrypt.compare(req.body.password, student.password);
    if (!match) return res.status(401).json({ msg: "Wrong password" });

    const accessToken = jwt.sign(
      { id: student._id, role: "student" },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id: student._id, role: "student" },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Save refresh token in DB
    student.refreshToken = refreshToken;
    await student.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge:  24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      msg: "Login successful",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (err) {
    console.error("Student Login Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


/* ================= REFRESH TOKEN ================= */
exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ msg: "Refresh token missing" });

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const student = await Student.findById(decoded.id);
    if (!student || student.refreshToken !== refreshToken) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: student._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ msg: "Access token refreshed" });
  } catch (err) {
    res.status(403).json({ msg: "Invalid refresh token" });
  }
};

/* ================= LOGOUT ================= */
exports.logoutStudent = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ msg: "Logged out successfully" });
};

/* ================= GET PROFILE ================= */
exports.getMe = async (req, res) => {
  const student = await Student.findById(req.user.id).select(
    "-password -refreshToken"
  );
  res.json(student);
};

/* ================= GET ALL STUDENTS ================= */


exports.getAllStudents = async (req, res) => {
  try {
    const department = req.user.department; // from auth middleware

    // Fetch students department-wise
    const students = await Student.find({ department })
      .select("-password -refreshToken")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: students.length,
      students
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching students",
      error: error.message
    });
  }
};




exports.getRegisteredStudents = async (req, res) => {
  try {
    const department = req.user.department; // SuperAdmin department

    // 1️⃣ Find all quizzes of this department
    const quizzes = await Quiz.find({ department }).select("registeredStudents");

    // 2️⃣ Collect unique registered student IDs
    const registeredStudentIds = new Set();
    quizzes.forEach(quiz => {
      quiz.registeredStudents.forEach(id => registeredStudentIds.add(id.toString()));
    });

    // 3️⃣ Get students who are in this department AND registered in department quizzes
    const students = await Student.find({
      _id: { $in: Array.from(registeredStudentIds) },
      department
    }).select("-password -refreshToken");

    res.status(200).json({
      success: true,
      totalRegistered: students.length,
      students
    });

  } catch (error) {
    console.error("Error fetching registered students:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching registered students",
      error: error.message
    });
  }
};


// getquizzes for students

exports.getStudentQuizzes = async (req, res) => {
  try {
    const studentId = req.params.id;
    const department = req.user.department; // SuperAdmin department

    // 1️⃣ Validate student exists in this department
    const student = await Student.findOne({ _id: studentId, department });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found in your department" });
    }

    // 2️⃣ Find all quizzes in this department where student is registered
    const quizzes = await Quiz.find({
      department,
      registeredStudents: studentId
    }).select("title subject startTime endTime course yr group");

    res.status(200).json({
      success: true,
      student: {
        _id: student._id,
        name: student.name,
        studentId: student.studentId,
        email: student.email,
        course: student.course,
      },
      quizzes
    });

  } catch (error) {
    console.error("Error fetching student quizzes:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



/* ================= GET ONE STUDENT ================= */
exports.getStudent = async (req, res) => {
  const student = await Student.findById(req.params.id).select(
    "-password -refreshToken"
  );
  res.json(student);
};

/* ================= DELETE STUDENT ================= */
exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ msg: "Student deleted successfully" });
};

/* ================= FORGOT PASSWORD ================= */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ msg: "Student not found" });

    const resetToken = jwt.sign(
      { id: student._id },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: "15m" }
    );

    student.resetToken = resetToken;
    student.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await student.save();

    const resetLink = `http://localhost:3000/student/reset-password/${resetToken}`;

    await sendEmail(
      email,
      "Reset Your Campus Quest Password",
      `<a href="${resetLink}">Reset Password</a>`
    );

    res.json({ msg: "Password reset email sent" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ================= RESET PASSWORD ================= */
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const student = await Student.findById(decoded.id);

    if (
      !student ||
      student.resetToken !== token ||
      student.resetTokenExpiry < Date.now()
    ) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    student.resetToken = null;
    student.resetTokenExpiry = null;

    await student.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ msg: "Invalid or expired token" });
  }
};


// GET CURRENT STUDENT PROFILE
exports.getStudentProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ msg: "Student not found" });

    res.status(200).json({
      id: req.user._id,
      studentId: req.user.studentId,
      name: req.user.name,
      email: req.user.email,
      department: req.user.department,
      course: req.user.course,
      semester: req.user.semester,
      group: req.user.group
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
