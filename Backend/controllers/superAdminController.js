// http://localhost:3000/api/superadmin/register



// {
//   "name": "Dr. Faizan",
//   "email": "faizan@college.com",
//   "password": "Faizan123",
//   "department": "Computer Application"
// }

// {
//   "superAdminId": "CA-SUP-2025-XXXX",
//   "password": "Faizan123"
// }


const SuperAdmin = require("../models/superAdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

/* =====================================================
   REGISTER HOD (PASSWORD ENTERED = TEMP PASSWORD)
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

    if (
      !username ||
      !facultyId ||
      !email ||
      !designation ||
      !department ||
      !password
    ) {
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
      password, // TEMP PASSWORD
      isTempPasswordUsed: false
    });

    res.status(201).json({
      msg: "HOD registered successfully. Password is temporary."
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* =====================================================
   LOGIN HOD
   ===================================================== */
exports.loginSuperAdmin = async (req, res) => {
  try {
    const { facultyId, password } = req.body;

    if (!facultyId || !password) {
      return res.status(400).json({ msg: "Faculty ID and password required" });
    }

    const admin = await SuperAdmin.findOne({ facultyId });
    if (!admin) {
      return res.status(404).json({ msg: "Invalid Faculty ID" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

   // 🔐 CREATE JWT TOKEN (ALWAYS)
const token = jwt.sign(
  { id: admin._id, role: "superadmin" },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: "1d" }
);

// TEMP PASSWORD LOGIN (but token still sent)
if (!admin.isTempPasswordUsed) {
  return res.status(200).json({
    msg: "Temp password login. Change password required.",
    forcePasswordChange: true,
    token,        // ✅ token will NOT be undefined
    role: "superadmin", 
    adminId: admin._id
  });
}

// NORMAL LOGIN
res.status(200).json({
  msg: "Login successful",
  token,          // ✅ token here too
  role: "superadmin",
  admin: {
    id: admin._id,
    username: admin.username,
    email: admin.email,
    department: admin.department,
    designation: admin.designation
  }
});

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* =====================================================
   CHANGE PASSWORD (FIRST LOGIN)
   ===================================================== */
exports.changePassword = async (req, res) => {
  try {
    const { adminId, newPassword } = req.body;

    if (!adminId || !newPassword) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const admin = await SuperAdmin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ msg: "HOD not found" });
    }

    admin.password = newPassword;
    admin.isTempPasswordUsed = true;

    await admin.save();

const token = jwt.sign(
  { id: admin._id },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: "1d" }
);

    res.status(200).json({
  msg: "Password changed successfully",
  token
});

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* =====================================================
   FORGOT PASSWORD (EMAIL BASED)
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
      <p>This link will expire in 15 minutes.</p>
      `
    );

    res.status(200).json({
      msg: "Password reset email sent"
    });
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

    res.status(200).json({
      msg: "Password reset successful"
    });
  } catch (err) {
    res.status(400).json({ msg: "Invalid or expired token" });
  }
};


exports.getSuperAdminProfile = async (req, res) => {
  try {
    // req.superAdmin already populated by middleware
    const admin = req.superAdmin;

    res.status(200).json({
      facultyName: admin.username,
      facultyId: admin.facultyId,
      department: admin.department,
      designation: admin.designation,
      email: admin.email
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
