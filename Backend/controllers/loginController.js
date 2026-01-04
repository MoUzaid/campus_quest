




const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Faculty = require("../models/FacultyModel");
const SuperAdmin = require("../models/superAdminModel");

const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;

    let user = null;
    let role = null;

    // 🔍 SuperAdmin (HOD)
    user = await SuperAdmin.findOne({ facultyId: userId });
    if (user) role = "superadmin";

    // 🔍 Faculty
    if (!user) {
      user = await Faculty.findOne({ facultyId: userId });
      if (user) role = "faculty";
    }

    // ❌ No student login here anymore
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🔐 Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🎟️ Tokens
    const accessToken = jwt.sign(
      { id: user._id, role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // 🍪 Cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      role,
      user: {
        id: user._id,
        name: user.username || user.name
      }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = loginController;
