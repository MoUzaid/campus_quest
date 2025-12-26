








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
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

/* =====================================================
   REGISTER HOD (TEMP PASSWORD)
===================================================== */

exports.registerSuperAdmin = async (req, res) => {
  try {
    const {
      username,
      facultyId,
      email,
      designation,
      department,
      password
    } = req.body;

    if (!username || !facultyId || !email || !designation || !department || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const exists = await SuperAdmin.findOne({
      $or: [{ email }, { facultyId }]
    });

    if (exists) {
      return res.status(400).json({ msg: "HOD already exists" });
    }

    await SuperAdmin.create({
      username,
      facultyId,
      email,
      designation,
      department,
      password,
      isTempPasswordUsed: false
    });

    res.status(201).json({
      msg: "HOD registered successfully. Temporary password issued."
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* =====================================================
   LOGIN HOD
===================================================== */

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "All fields required" });

    const admin = await SuperAdmin.findById(req.user.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Current password incorrect" });

    admin.password = newPassword; // schema will hash
    admin.isTempPasswordUsed = true;

    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "All fields required" });

    const admin = await SuperAdmin.findById(req.user.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // 🔹 Trim both sides to avoid spaces mismatch
    if (admin.password.trim() !== currentPassword.trim()) {
      console.log("DB:", admin.password, "Provided:", currentPassword);
      return res.status(401).json({ message: "Current password incorrect" });
    }

    admin.password = newPassword.trim(); // plaintext assignment
    admin.isTempPasswordUsed = true;

    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });

  } catch (err) {
    console.error("CHANGE PASSWORD ERROR:", err);
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
      return res.status(401).json({ msg: "Refresh token missing" });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const admin = await SuperAdmin.findById(decoded.id);

    if (!admin || admin.refreshToken !== token) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(admin);
    sendAuthCookies(res, newAccessToken, token);

    res.status(200).json({ msg: "Access token refreshed" });

  } catch (err) {
    res.status(403).json({ msg: "Invalid or expired refresh token" });
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
      return res.status(404).json({ msg: "HOD not found" });
    }

    const resetToken = jwt.sign(
      { id: admin._id },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: "15m" }
    );

    admin.resetToken = resetToken;
    admin.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await admin.save();

    const resetLink = `http://localhost:5173/hod-reset-password/${resetToken}`;

    await sendEmail(
      email,
      "Reset HOD Password",
      `
        <p>Hello ${admin.username},</p>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link expires in 15 minutes.</p>
      `
    );

    res.status(200).json({ msg: "Password reset email sent" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
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

    if (
      !admin ||
      admin.resetToken !== token ||
      admin.resetTokenExpiry < Date.now()
    ) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    admin.password = newPassword;
    admin.resetToken = null;
    admin.resetTokenExpiry = null;
    admin.isTempPasswordUsed = true;

    await admin.save();

    res.status(200).json({ msg: "Password reset successful" });

  } catch (err) {
    res.status(400).json({ msg: "Invalid or expired token" });
  }
};

/* =====================================================
   LOGOUT
===================================================== */

exports.logoutSuperAdmin = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({ msg: "Logged out successfully" });
};

/* =====================================================
   GET PROFILE
===================================================== */

exports.getSuperAdminProfile = async (req, res) => {
  try {
    const admin = req.superAdmin;

    res.status(200).json({
      facultyName: admin.username,
      facultyId: admin.facultyId,
      department: admin.department,
      designation: admin.designation,
      email: admin.email
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
