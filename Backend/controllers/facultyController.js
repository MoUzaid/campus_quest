const Faculty = require("../models/FacultyModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};


exports.addFaculty = async (req, res) => {
  try {
    const {
      facultyId,
      name,
      email,
      mobileNumber,
      department,
      designation,
      password,
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
      return res.status(400).json({ message: "All fields are required." });
    }

    const exists = await Faculty.findOne({
      $or: [{ email }, { facultyId }],
    });
    if (exists) {
      return res.status(400).json({
        message: "Faculty already exists with same email or facultyId.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newFaculty = new Faculty({
      facultyId,
      name,
      email,
      mobileNumber,
      department: department.trim(),
      designation,
      password: hashedPassword,
      isTempPassword: true,
    });

    await newFaculty.save();

    const accessToken = createAccessToken({ id: newFaculty._id });
    const refreshToken = createRefreshToken({ id: newFaculty._id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/faculty/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Faculty registered successfully",
      accessToken,
      faculty: {
        facultyId: newFaculty.facultyId,
        name: newFaculty.name,
        email: newFaculty.email,
        department: newFaculty.department,
        designation: newFaculty.designation,
        role: newFaculty.role,
      },
    });
  } catch (error) {
    console.log("Add Faculty Error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};


exports.loginFaculty = async (req, res) => {
  try {
    const { facultyId, password } = req.body;

    if (!facultyId || !password) {
      return res
        .status(400)
        .json({ message: "Faculty ID and password required." });
    }

    const faculty = await Faculty.findOne({ facultyId });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const accessToken = createAccessToken({ id: faculty._id });
    const refreshToken = createRefreshToken({ id: faculty._id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/faculty/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: faculty.isTempPassword
        ? "Login successful. Please change your temporary password."
        : "Login successful.",
      requiresPasswordChange: faculty.isTempPassword,
      accessToken,
      faculty: {
        facultyId: faculty.facultyId,
        name: faculty.name,
        email: faculty.email,
        department: faculty.department,
        designation: faculty.designation,
        role: faculty.role,
      },
    });
  } catch (error) {
    console.log("Faculty Login Error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};


exports.refreshToken = async (req, res) => {
  try {
    const rfToken = req.cookies.refreshToken;

    if (!rfToken) {
      return res.status(401).json({ message: "Please login again." });
    }

    jwt.verify(
      rfToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Invalid refresh token." });
        }

        const faculty = await Faculty.findById(decoded.id).select("-password");
        if (!faculty) {
          return res.status(404).json({ message: "Faculty not found." });
        }

        const accessToken = createAccessToken({ id: faculty._id });

        return res.status(200).json({
          accessToken,
          faculty: {
            facultyId: faculty.facultyId,
            name: faculty.name,
            email: faculty.email,
            department: faculty.department,
            designation: faculty.designation,
            role: faculty.role,
          },
        });
      }
    );
  } catch (error) {
    console.log("Refresh Token Error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};


exports.updatePassword = async (req, res) => {
  try {
    const { facultyId, newPassword } = req.body;

    if (!facultyId || !newPassword) {
      return res
        .status(400)
        .json({ message: "Faculty ID and new password required." });
    }

    const faculty = await Faculty.findOne({ facultyId });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    faculty.password = await bcrypt.hash(newPassword, 10);
    faculty.isTempPassword = false;

    await faculty.save();

    return res
      .status(200)
      .json({ message: "Password updated successfully." });
  } catch (error) {
    console.log("Update Password Error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};


exports.deleteFaculty = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const faculty = await Faculty.findOneAndDelete({ facultyId });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    return res
      .status(200)
      .json({ message: "Faculty deleted successfully." });
  } catch (error) {
    console.log("Delete Faculty Error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};


exports.getAllFaculty = async (req, res) => {
  try {
    const {
      facultyId,
      name,
      email,
      department,
      designation,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};
    if (facultyId) query.facultyId = facultyId;
    if (name) query.name = { $regex: name, $options: "i" };
    if (email) query.email = { $regex: email, $options: "i" };
    if (department) query.department = department.trim();
    if (designation) query.designation = designation;

    const skip = (page - 1) * limit;

    const facultyList = await Faculty.find(query)
      .skip(skip)
      .limit(Number(limit))
      .select("-password -__v");

    const total = await Faculty.countDocuments(query);

    return res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      faculty: facultyList,
    });
  } catch (error) {
    console.log("Get All Faculty Error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
