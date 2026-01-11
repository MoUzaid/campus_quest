const SuperAdmin = require("../models/superAdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

/* =====================================================
   TOKEN HELPERS
===================================================== */

const generateAccessToken = (admin) =>
  jwt.sign(
    { id: admin._id, role: "superadmin" },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

const generateRefreshToken = (admin) =>
  jwt.sign(
    { id: admin._id, role: "superadmin" },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

const sendAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

/* =====================================================
   REGISTER SUPER ADMIN
===================================================== */

exports.registerSuperAdmin = async (req, res) => {
  try {
    const { username, facultyId, email, designation, department, password } = req.body;
    console.log("super admin",req.body);

    if (!username || !facultyId || !email || !designation || !department || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await SuperAdmin.findOne({
      $or: [{ email }, { facultyId }]
    });

    if (exists) {
      return res.status(400).json({ message: "SuperAdmin already exists" });
    }

    await SuperAdmin.create({
      username,
      facultyId,
      email,
      designation,
      department,
      password, // schema pre-save will hash
      isTempPasswordUsed: false
    });

    res.status(201).json({ message: "SuperAdmin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   LOGIN SUPER ADMIN
===================================================== */

exports.superAdminLogin = async (req, res) => {
  try {
    const { facultyId, password } = req.body;

    const admin = await SuperAdmin.findOne({ facultyId });
    if (!admin) {
      return res.status(400).json({ message: "SuperAdmin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin);

    admin.refreshToken = refreshToken;
    await admin.save();

    sendAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      role: "superadmin",
      user: {
        id: admin._id,
        name: admin.username,
        facultyId: admin.facultyId
      }
    });
  } catch (err) {
    console.error("SUPERADMIN LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   CHANGE PASSWORD (ONLY ONE VERSION)
===================================================== */

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const admin = await SuperAdmin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ message: "SuperAdmin not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password incorrect" });
    }

    admin.password = newPassword;
    admin.isTempPasswordUsed = true;
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   REFRESH TOKEN
===================================================== */

exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const admin = await SuperAdmin.findById(decoded.id);

    if (!admin || admin.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(admin);
    sendAuthCookies(res, newAccessToken, token);

    res.status(200).json({ message: "Access token refreshed" });
  } catch {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

/* =====================================================
   FORGOT PASSWORD
===================================================== */

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await SuperAdmin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "SuperAdmin not found" });
    }

    const resetToken = jwt.sign(
      { id: admin._id },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: "15m" }
    );

    admin.resetToken = resetToken;
    admin.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await admin.save();

    const resetLink = `http://localhost:5173/superadmin-reset-password/${resetToken}`;

    await sendEmail(
      email,
      "Reset SuperAdmin Password",
      `<p>Click below to reset your password:</p>
       <a href="${resetLink}">Reset Password</a>`
    );

    res.status(200).json({ message: "Reset email sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   RESET PASSWORD
===================================================== */

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const admin = await SuperAdmin.findById(decoded.id);

    if (!admin || admin.resetToken !== token || admin.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    admin.password = newPassword;
    admin.resetToken = null;
    admin.resetTokenExpiry = null;
    admin.isTempPasswordUsed = true;
    await admin.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

/* =====================================================
   LOGOUT
===================================================== */

exports.logoutSuperAdmin = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
};

/* =====================================================
   GET PROFILE
===================================================== */

exports.getSuperAdminProfile = async (req, res) => {
  const admin = req.superAdmin;

  res.status(200).json({
    name: admin.username,
    facultyId: admin.facultyId,
    department: admin.department,
    designation: admin.designation,
    email: admin.email
  });
};


const QuizAttempt = require("../models/QuizAttemptModel");

exports.getDepartmentAttemptedQuizzes = async (req, res) => {
  try {
    const superAdminDepartment = req.user.department;

    const attempts = await QuizAttempt.find()
      .populate({
        path: "quizId",
        select: "title subject department createdBy",
      })
      .populate("student", "name enrollmentNumber")
      .sort({ attemptedAt: -1 });

    // 🔥 FILTER BY DEPARTMENT
    const filteredAttempts = attempts.filter(
      (attempt) =>
        attempt.quizId &&
        attempt.quizId.department === superAdminDepartment
    );

    res.status(200).json(filteredAttempts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching department attempted quizzes",
      error: error.message,
    });
  }
};






















exports.getStudentAttemptedQuizzes = async (req, res) => {
  try {
    const { studentId } = req.params;
    const department = req.user.department;

    const attempts = await QuizAttempt.find({ student: studentId })
      .populate({
        path: "quizId",
        select: "title subject department totalMarks durationMinutes",
      })
      .populate({
        path: "student",
        select: "name enrollmentNumber email",
      })
      .sort({ attemptedAt: -1 });

    // 🔐 department security
    const filteredAttempts = attempts.filter(
      (a) => a.quizId && a.quizId.department === department
    );

    res.status(200).json({
      student: filteredAttempts[0]?.student || null,
      department,
      totalQuizzesAttempted: filteredAttempts.length,
      attempts: filteredAttempts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch student attempts",
      error: error.message,
    });
  }
};


exports.getQuizAttemptsAnalytics = async (req, res) => {
  try {
    const { quizId } = req.params;

    const attempts = await QuizAttempt.find({ quizId })
      .populate("student", "name email gender studentId department group course") // ✅ use studentId instead of rollNo
  .sort({ attemptedAt: -1 });
      

    const totalAttempts = attempts.length;

    const maleCount = attempts.filter(
      a => a.student?.gender === "Male"
    ).length;

    const femaleCount = attempts.filter(
      a => a.student?.gender === "Female"
    ).length;

    res.json({
      totalAttempts,
      maleCount,
      femaleCount,
      attempts
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};