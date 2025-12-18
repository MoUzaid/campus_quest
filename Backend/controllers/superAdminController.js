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

/* 🔹 UTILITY: TEMP PASSWORD GENERATOR */
const generateTempPassword = () => {
  return Math.random().toString(36).slice(-8); // 8 char password
};

/* =========================
   REGISTER SUPER ADMIN (HOD)
   ========================= */
exports.registerSuperAdmin = async (req, res) => {
  try {
    const {
      username,
      facultyId,
      email,
      designation,
      department
    } = req.body;

    if (!username || !facultyId || !email || !designation || !department) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await SuperAdmin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists." });
    }

    /* 🔐 Generate TEMP PASSWORD */
    const tempPassword = generateTempPassword();
    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);

    const admin = new SuperAdmin({
      username,
      facultyId,
      email,
      designation,
      department,

      password: hashedTempPassword,   // login allowed
      tempPassword: hashedTempPassword,
      isTempPasswordUsed: false
    });

    await admin.save();

    /* 🔔 Yahan tum email bhej sakte ho */
    // sendEmail(email, `Your temp password is: ${tempPassword}`);

    return res.status(201).json({
      message: "HOD registered successfully.",
      tempPassword, // ❗ production me email karo, response me mat bhejo
      admin: {
        facultyId: admin.facultyId,
        username: admin.username,
        email: admin.email,
        department: admin.department,
        designation: admin.designation
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};


/* =====================
   LOGIN SUPER ADMIN
   ===================== */
exports.loginSuperAdmin = async (req, res) => {
  try {
    const { facultyId, password } = req.body;

    if (!facultyId || !password) {
      return res.status(400).json({ message: "ID and Password required." });
    }

    const admin = await SuperAdmin.findOne({ facultyId });
    if (!admin) {
      return res.status(400).json({ message: "Invalid Faculty ID." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    /* 🔐 FIRST LOGIN CHECK */
    if (!admin.isTempPasswordUsed) {
      return res.status(200).json({
        message: "Temp password login successful. Please change password.",
        forcePasswordChange: true,
        adminId: admin._id
      });
    }

    return res.status(200).json({
      message: "Login successful.",
      forcePasswordChange: false,
      admin: {
        facultyId: admin.facultyId,
        username: admin.username,
        email: admin.email,
        department: admin.department
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};


/* =========================
   CHANGE PASSWORD (FIRST LOGIN)
   ========================= */
exports.changePassword = async (req, res) => {
  try {
    const { adminId, newPassword } = req.body;

    if (!adminId || !newPassword) {
      return res.status(400).json({ message: "All fields required." });
    }

    const admin = await SuperAdmin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;
    admin.tempPassword = null;
    admin.isTempPasswordUsed = true;

    await admin.save();

    return res.status(200).json({
      message: "Password changed successfully."
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};
