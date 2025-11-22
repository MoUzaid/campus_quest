

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

// ID Generator
function generateSuperAdminId(department) {
  const deptCode = department
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

  const year = new Date().getFullYear();

  // Generate 8-character alphanumeric string
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomStr = "";
  for (let i = 0; i < 8; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${deptCode}-SUP-${year}-${randomStr}`;
}


/* =========================
   REGISTER SUPER ADMIN
   =========================*/
exports.registerSuperAdmin = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    if (!name || !email || !password || !department) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await SuperAdmin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const generatedId = generateSuperAdminId(department);

    const admin = new SuperAdmin({
      superAdminId: generatedId,
      name,
      email,
      password: hashedPassword,
      department
    });

    await admin.save();

    return res.status(201).json({
      message: "Super Admin registered successfully.",
      superAdminId: generatedId
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};


/* =========================
   LOGIN SUPER ADMIN
   =========================*/
exports.loginSuperAdmin = async (req, res) => {
  try {
    const { superAdminId, password } = req.body;

    if (!superAdminId || !password) {
      return res.status(400).json({ message: "ID and Password required." });
    }

    const admin = await SuperAdmin.findOne({ superAdminId });
    if (!admin) {
      return res.status(400).json({ message: "Invalid ID." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    return res.status(200).json({
      message: "Login successful.",
      admin: {
        superAdminId: admin.superAdminId,
        name: admin.name,
        email: admin.email,
        department: admin.department
      }
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};
