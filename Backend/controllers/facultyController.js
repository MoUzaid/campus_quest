const Faculty = require("../models/FacultyModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

/* =====================================================
   TOKEN HELPERS
   ===================================================== */
const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

const createRefreshToken = (payload) =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

/* =====================================================
// ADD FACULTY (BY HOD) → PASSWORD = TEMP PASSWORD
// Only HOD can add faculty in their own department
// ===================================================== */




// //    ADD FACULTY (BY HOD) → PASSWORD = TEMP PASSWORD
// //    ===================================================== */
exports.addFaculty = async (req, res) => {
  try {
    const {
      facultyId,
      name,
      email,
      mobileNumber,
      department,
      designation,
      password
    } = req.body;

    if (
      !facultyId ||
      !name ||
      !email ||
      !mobileNumber ||
      !department ||
      !designation ||
      !password
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const exists = await Faculty.findOne({
      $or: [{ email }, { facultyId }]
    });

    if (exists) {
      return res
        .status(400)
        .json({ msg: "Faculty already exists" });
    }

    const faculty = await Faculty.create({
      facultyId,
      name,
      email,
      mobileNumber,
      department: department.trim(),
      designation,
      password, // temp password
      isTempPasswordUsed: false
    });

    res.status(201).json({
      msg: "Faculty added successfully. Password is temporary.",
      faculty: {
        facultyId: faculty.facultyId,
        name: faculty.name,
        email: faculty.email,
        department: faculty.department,
        designation: faculty.designation,
        role: faculty.role
      }
    });
  } catch (err) {
    console.error("Add Faculty Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* =====================================================
   CHANGE PASSWORD (FIRST LOGIN)
   ===================================================== */
exports.changePassword = async (req, res) => {
  try {
    const { facultyId, newPassword } = req.body;
    if (!facultyId || !newPassword) {
      return res.status(400).json({ msg: "Faculty ID and new password required" });
    }

    const faculty = await Faculty.findOne({ facultyId });
    if (!faculty) return res.status(404).json({ msg: "Faculty not found" });

    faculty.password = newPassword;
    faculty.isTempPasswordUsed = true;
    await faculty.save();

    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error("Change Password Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* =====================================================
   REFRESH TOKEN
   ===================================================== */
exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ msg: "Please login again" });

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const faculty = await Faculty.findById(decoded.id).select("-password");
    if (!faculty) return res.status(404).json({ msg: "Faculty not found" });

    const accessToken = createAccessToken({ id: faculty._id, role: faculty.role, department: faculty.department });

    res.json({ accessToken, faculty });
  } catch (err) {
    console.error("Refresh Token Error:", err);
    res.status(403).json({ msg: "Invalid refresh token" });
  }
};

/* =====================================================
   FORGOT PASSWORD (EMAIL)
   ===================================================== */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const faculty = await Faculty.findOne({ email });
    if (!faculty) return res.status(404).json({ msg: "Faculty not found" });

    const resetToken = jwt.sign({ id: faculty._id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: "15m" });
    faculty.resetToken = resetToken;
    faculty.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await faculty.save();

    const resetLink = `http://localhost:5173/faculty-reset-password/${resetToken}`;
    await sendEmail(email, "Reset Faculty Password", `<p>Hello ${faculty.name},</p><p><a href="${resetLink}">Reset Password</a></p>`);

    res.json({ msg: "Password reset email sent" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* =====================================================
   RESET PASSWORD
   ===================================================== */
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const faculty = await Faculty.findById(decoded.id);

    if (!faculty || faculty.resetToken !== token || faculty.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    faculty.password = newPassword;
    faculty.resetToken = null;
    faculty.resetTokenExpiry = null;
    faculty.isTempPasswordUsed = true;
    await faculty.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ msg: "Invalid or expired token" });
  }
};

/* =====================================================
   DELETE FACULTY
   ===================================================== */
exports.deleteFaculty = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const faculty = await Faculty.findOneAndDelete({ facultyId });
    if (!faculty) return res.status(404).json({ msg: "Faculty not found" });

    res.json({ msg: "Faculty deleted successfully" });
  } catch (err) {
    console.error("Delete Faculty Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* =====================================================
   GET ALL FACULTY (FILTER + PAGINATION)
   ===================================================== */
exports.getAllFaculty = async (req, res) => {
  try {
    const { facultyId, name, email, designation, page = 1, limit = 20 } = req.query;

    // 🔐 HOD can see only own department
    const query = { department: req.user.department };

    if (facultyId) query.facultyId = facultyId.trim();
    if (name) query.name = { $regex: name, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };
    if (designation) query.designation = designation.trim();

    const skip = (Number(page) - 1) * Number(limit);

    const facultyList = await Faculty.find(query)
      .skip(skip)
      .limit(Number(limit))
      .select("-password -resetToken -resetTokenExpiry -__v");

    const total = await Faculty.countDocuments(query);

    // 👇 Console log for total faculty count
    console.log("📊 Total Faculty Count:", total);

    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      faculty: facultyList
    });
  } catch (err) {
    console.error("Get All Faculty Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* =====================================================
   GET FACULTY PROFILE
   ===================================================== */
exports.getFacultyProfile = async (req, res) => {
  try {
    const faculty = req.user;
    res.status(200).json({
      success: true,
      profile: {
        id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        department: faculty.department,
        designation: faculty.designation
      }
    });
  } catch (err) {
    console.error("Get Faculty Profile Error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch faculty profile" });
  }
};
/* =====================================================
   FACULTY LOGIN
   ===================================================== */
exports.facultyLogin = async (req, res) => {
  try {
    const { facultyId, password } = req.body;
    if (!facultyId || !password) {
      return res.status(400).json({ msg: "Faculty ID and password are required" });
    }

    // 🔍 find faculty
    const faculty = await Faculty.findOne({ facultyId });
    if (!faculty) {
      return res.status(404).json({ msg: "Faculty not found" });
    }

    // 🔐 password check
    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    //🚨 temp password check (first login)
    if (!faculty.isTempPasswordUsed) {
      return res.status(403).json({
        msg: "Temporary password detected. Please change your password first.",
        forceChangePassword: true
      });
    }

    // 🔐 tokens using helpers
    const payload = {
      id: faculty._id,
      role: "faculty",
      department: faculty.department
    };
    console.log(payload)
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    // 🍪 cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      role: "faculty",
      user: {
        id: faculty._id,
        facultyId: faculty.facultyId,
        name: faculty.name,
        email: faculty.email,
        department: faculty.department,
        designation: faculty.designation
      }
    });

  } catch (err) {
    console.error("FACULTY LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
