
// http://localhost:5000/api/faculty/add
// {
  //  "facultyId": "CA-F01",
//   "name": "Anam Sheikh",
//   "email": "anam@college.com",
//   "mobileNumber": "9876543210",
//   "department": "Computer Application",
//   "designation": "Assistant Professor",
//   "password": "Temp@123"
// }


// http://localhost:5000/api/faculty/login
// {
//   "facultyId": "FAC-2025-325689",
//   "password": "Temp@123"
// }



// http://localhost:5000/api/faculty/update-password
// {
//   "facultyId": "FAC-2025-325689",
//   "newPassword": "AnamStrongPassword12"
// }

// After login

// http://localhost:5000/api/faculty/login
// {
//   "facultyId": "FAC-2025-325689",
//   "password": "AnamStrongPassword12"
// }

// Delete Faculty

// http://localhost:5000/api/faculty/FAC-2025-325689

// http://localhost:3000/api/faculty/all


const Faculty = require("../models/facultyModel");
const bcrypt = require("bcryptjs");

  // ✔ ADD FACULTY (HOD enters Faculty ID manually)

exports.addFaculty = async (req, res) => {
  try {
    const { facultyId, name, email, mobileNumber, department, designation, password } = req.body;

    // Check all fields
    if (!facultyId || !name || !email || !mobileNumber || !department || !designation || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Trim department 
    const cleanDept = department.trim();

    // Email duplicate check
    const existingEmail = await Faculty.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Faculty already exists with this email." });
    }

    // Faculty ID duplicate check
    const existingId = await Faculty.findOne({ facultyId });
    if (existingId) {
      return res.status(400).json({ message: "Faculty ID already exists. Enter a unique ID." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newFaculty = new Faculty({
      facultyId,
      name,
      email,
      mobileNumber,
      department: cleanDept,
      designation,
      password: hashedPassword,
      isTempPassword: true
    });

    await newFaculty.save();

    return res.status(201).json({
      message: "Faculty added successfully.",
      facultyId
    });

  } catch (error) {
    console.log("Add Faculty Error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};



  //  ✔ LOGIN FACULTY
   
exports.loginFaculty = async (req, res) => {
  try {
    const { facultyId, password } = req.body;

    if (!facultyId || !password) {
      return res.status(400).json({ message: "Faculty ID and password are required." });
    }

    const faculty = await Faculty.findOne({ facultyId });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    return res.status(200).json({
      message: faculty.isTempPassword
        ? "Login successful. Please change your temporary password."
        : "Login successful.",
      requiresPasswordChange: faculty.isTempPassword,
      faculty: {
        facultyId: faculty.facultyId,
        name: faculty.name,
        email: faculty.email,
        department: faculty.department,
        designation: faculty.designation
      }
    });

  } catch (error) {
    console.log("Faculty Login Error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};


/* ==========================================================
   ✔ UPDATE PASSWORD (FIRST-TIME PASSWORD CHANGE)
   ========================================================== */
exports.updatePassword = async (req, res) => {
  try {
    const { facultyId, newPassword } = req.body;

    if (!facultyId || !newPassword) {
      return res.status(400).json({ message: "Faculty ID and new password required." });
    }

    const faculty = await Faculty.findOne({ facultyId });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    faculty.password = hashed;
    faculty.isTempPassword = false;

    await faculty.save();

    return res.status(200).json({ message: "Password updated successfully." });

  } catch (error) {
    console.log("Update Password Error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};



  //  ✔ DELETE FACULTY (HOD)
  
exports.deleteFaculty = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const faculty = await Faculty.findOneAndDelete({ facultyId });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found." });
    }

    return res.status(200).json({ message: "Faculty deleted successfully." });

  } catch (error) {
    console.log("Delete Faculty Error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};



  //  ✔ GET ALL FACULTY (Advanced Filtering + Sorting + Pagination)
 
exports.getAllFaculty = async (req, res) => {
  try {
    const {
      facultyId,
      name,
      email,
      mobileNumber,
      department,
      designation,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 20
    } = req.query;

    const query = {};

    if (facultyId) query.facultyId = facultyId;

    if (name) query.name = { $regex: name, $options: "i" };

    if (email) query.email = { $regex: email, $options: "i" };

    if (mobileNumber) query.mobileNumber = mobileNumber;

    if (department) query.department = department.trim();

    if (designation) query.designation = designation;

    // Sorting
    const sortQuery = {};
    sortQuery[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Pagination numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const facultyList = await Faculty.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limitNumber)
      .select("-password -__v");

    const total = await Faculty.countDocuments(query);

    return res.status(200).json({
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      faculty: facultyList
    });

  } catch (error) {
    console.log("Get All Faculty Error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
