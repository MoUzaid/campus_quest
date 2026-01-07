const Faculty = require("../models/FacultyModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const Activity = require("../models/activityModel");

const QuizAttempt = require("../models/QuizAttemptModel");
const Student = require("../models/studentModel"); // ✅ REQUIRED


/* =====================================================
   TOKEN HELPERS
   ===================================================== */
const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

const createRefreshToken = (payload) =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });




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

await Activity.create({
      action: "FACULTY_ADDED",
      message: `Faculty "${name}" added in ${department} department`,
      performedBy: req.user?.name || "Super Admin"
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


exports.loginFaculty = async (req, res) => {
  try {
    const { facultyId, password } = req.body;

    if (!facultyId || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 🔍 Must select password explicitly
    const faculty = await Faculty.findOne({ facultyId }).select("+password");
    if (!faculty) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔐 Password check
    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔑 Tokens
    const accessToken = jwt.sign(
      { id: faculty._id, role: "faculty" },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: faculty._id, role: "faculty" },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // 💾 Save refresh token
    faculty.refreshToken = refreshToken;
    await faculty.save();

    // 🍪 Send cookies inline (SuperAdmin style)
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 15 * 60 * 1000
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      role: "faculty",
      user: {
        id: faculty._id,
        name: faculty.name,
        facultyId: faculty.facultyId
      }
    });
  } catch (err) {
    console.error("FACULTY LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
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


     await Activity.create({
      action: "FACULTY_DELETED",
      message: `Faculty "${faculty.name}" deleted from ${faculty.department}`,
      performedBy: req.user?.name || "Super Admin"
    });

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
        facultyId: faculty.facultyId,
        name: faculty.name,
        email: faculty.email,
        mobileNumber:faculty.mobileNumber,
        department: faculty.department,
        designation: faculty.designation
      }
      
    });
    console.log("Faculty profile:", faculty);

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

/* =====================================================
   UPDATE FACULTY (EDIT FROM SUPER ADMIN)
   ===================================================== */
exports.updateFaculty = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const {
      name,
      email,
      mobileNumber,
      designation,
      department,
      isActive
    } = req.body;

    const faculty = await Faculty.findOne({ facultyId });
    if (!faculty) {
      return res.status(404).json({ msg: "Faculty not found" });
    }

    // 🔁 Partial updates (no field required)
    if (name) faculty.name = name;
    if (email) faculty.email = email;
    if (mobileNumber) faculty.mobileNumber = mobileNumber;
    if (designation) faculty.designation = designation;
    if (department) faculty.department = department;

    // Admin-only flag (safe check)
    if (typeof isActive === "boolean") {
      faculty.isActive = isActive;
    }

    await faculty.save();

    await Activity.create({
      action: "FACULTY_UPDATED",
      message: `Faculty "${faculty.name}" updated their profile`,
      performedBy: req.user?.name || "Faculty"
    });

    res.json({
      msg: "Profile updated successfully",
      faculty
    });
  } catch (err) {
    console.error("Update Faculty Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


const Quiz = require("../models/quizModel");

exports.getFacultyQuizzes = async (req, res) => {
  try {
    const { facultyId } = req.params;

    const superAdmin = req.user;
    if (!superAdmin || !superAdmin.department) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 1️⃣ Get faculty
    const faculty = await Faculty.findById(facultyId).select(
      "facultyId name department createdAt"
    );

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // 2️⃣ Get quizzes of this faculty
    const quizzes = await Quiz.find({
      createdBy: faculty._id,
      department: superAdmin.department
    }).lean();

    const quizIds = quizzes.map(q => q._id);

    // 3️⃣ Aggregate attempts for avg score AND unique students
    const attemptsStats = await QuizAttempt.aggregate([
      {
        $match: {
          quizId: { $in: quizIds }
        }
      },
      {
        $group: {
          _id: "$quizId",
          avgScore: { $avg: "$scoredMarks" },
          totalAttempts: { $sum: 1 },
          // ADDED: Unique students who attempted
          uniqueAttempts: { $addToSet: "$student" }
        }
      },
      {
        $project: {
          _id: 1,
          avgScore: 1,
          totalAttempts: 1,
          uniqueAttempts: { $size: "$uniqueAttempts" } // Count of unique students
        }
      }
    ]);

    // 4️⃣ Convert stats to map
    const statsMap = {};
    attemptsStats.forEach(stat => {
      statsMap[stat._id.toString()] = {
        avgScore: Math.round(stat.avgScore * 100) / 100,
        totalAttempts: stat.totalAttempts,
        uniqueAttempts: stat.uniqueAttempts // ADDED
      };
    });

    // 5️⃣ Attach stats to quizzes
    const quizzesWithAnalytics = quizzes.map(quiz => {
      const stat = statsMap[quiz._id.toString()] || {
        avgScore: 0,
        totalAttempts: 0,
        uniqueAttempts: 0 // ADDED
      };

      return {
        ...quiz,
        avgScore: stat.avgScore,
        totalAttempts: stat.totalAttempts,
        uniqueAttempts: stat.uniqueAttempts, // ADDED
        // Calculate percentage of registered students who attempted
        attemptedPercentage: quiz.registeredStudents && quiz.registeredStudents.length > 0 
          ? Math.round((stat.uniqueAttempts / quiz.registeredStudents.length) * 100) 
          : 0
      };
    });

    // 6️⃣ Debug log
    console.log(`📊 Faculty ${facultyId} Quizzes Stats:`, {
      totalQuizzes: quizzesWithAnalytics.length,
      quizzes: quizzesWithAnalytics.map(q => ({
        title: q.title,
        registered: q.registeredStudents?.length || 0,
        attempted: q.uniqueAttempts || 0,
        totalAttempts: q.totalAttempts || 0,
        percentage: q.attemptedPercentage || 0
      }))
    });

    res.status(200).json({
      faculty,
      quizzes: quizzesWithAnalytics,
      totalQuizzes: quizzesWithAnalytics.length
    });

  } catch (err) {
    console.error("❌ getFacultyQuizzes:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};



exports.getFacultyStudentsOverview = async (req, res) => {
  try {
    const facultyId = req.user._id;

    /* =======================
       1️⃣ Faculty Quizzes
    ======================= */
    const quizzes = await Quiz.find({ createdBy: facultyId })
      .select("title registeredStudents")
      .lean();

    const quizMap = new Map(); // quizId -> quizTitle
    quizzes.forEach(q => quizMap.set(String(q._id), q.title));

    const facultyQuizIds = quizzes.map(q => q._id);

    /* =======================
       2️⃣ REGISTERED STUDENTS
    ======================= */
    const registeredMap = new Map(); // studentId -> quizzes[]

    for (const quiz of quizzes) {
      for (const studentId of quiz.registeredStudents) {
        if (!studentId) continue; // safety check

        const key = String(studentId);

        if (!registeredMap.has(key)) {
          registeredMap.set(key, {
            studentId,
            quizzes: []
          });
        }

        registeredMap.get(key).quizzes.push({
          quizId: quiz._id,
          quizTitle: quiz.title
        });
      }
    }

    const registeredStudentIds = [...registeredMap.keys()];

    const registeredStudentsData = registeredStudentIds.length > 0
      ? await Student.find({ _id: { $in: registeredStudentIds } })
          .select("name enrollmentNumber gender course group email createdAt")
          .lean()
      : [];

    const registeredStudents = registeredStudentsData.map(stu => {
      const entry = registeredMap.get(String(stu._id));

      return {
        _id: stu._id,                         
        name: stu.name || "-",
        enrollmentNumber: stu.enrollmentNumber || "-",
        email: stu.email || "-",
        memberSince: stu.createdAt || null,
        gender: stu.gender || "-",
        course: stu.course || "-",
        group: stu.group || "-",
        quizCount: entry.quizzes.length,
        quizzes: entry.quizzes.map(q => q.quizTitle)
      };
    });

    /* =======================
       3️⃣ ATTEMPTED STUDENTS
    ======================= */
    const attempts = facultyQuizIds.length > 0
      ? await QuizAttempt.find({ quizId: { $in: facultyQuizIds } })
          .populate(
            "student",
            "name enrollmentNumber gender course group email createdAt"
          )
          .lean()
      : [];

    const attemptedStudents = attempts.map(a => {
      const s = a.student || {};
      return {
        _id: s._id || null,
        name: s.name || "-",
        enrollmentNumber: s.enrollmentNumber || "-",
        gender: s.gender || "-",
        email: s.email || "-",
        memberSince: s.createdAt || null,
        course: s.course || "-",
        group: s.group || "-",
        quizName: quizMap.get(String(a.quizId)) || "-",
        score: a.scoredMarks ?? 0
      };
    });

    /* =======================
       4️⃣ GENDER COUNTS
    ======================= */
    const genderStats = {
      registered: { Male: 0, Female: 0, Other: 0 },
      attempted: { Male: 0, Female: 0, Other: 0 }
    };

    registeredStudents.forEach(s => {
      if (genderStats.registered[s.gender] !== undefined) {
        genderStats.registered[s.gender]++;
      }
    });

    attemptedStudents.forEach(s => {
      if (genderStats.attempted[s.gender] !== undefined) {
        genderStats.attempted[s.gender]++;
      }
    });

    /* =======================
       RESPONSE
    ======================= */
    return res.status(200).json({
      registeredStudents,
      attemptedStudents,
      genderStats
    });

  } catch (err) {
    console.error("Faculty students error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};








exports.getStudentRegisteredQuizzesByFaculty = async (req, res) => {
  try {
    const facultyId = req.user._id;
    const { studentId } = req.params;

    // Add pagination and filtering
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const statusFilter = req.query.status; // 'attempted', 'missed', 'active', 'upcoming'
    const subjectFilter = req.query.subject;
    const courseFilter = req.query.course;

    /* ================= STUDENT DETAILS ================= */
    const student = await Student.findById(studentId).select(
      "name enrollmentNumber gender course group email phone enrollmentDate"
    ).lean();

     

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    /* ================= PARALLEL QUERIES ================= */
    const [quizzesResult, allAttempts, totalCount] = await Promise.all([
      // Get quizzes with detailed information
      Quiz.find({
        createdBy: facultyId,
        registeredStudents: studentId,
        ...(subjectFilter && { subject: subjectFilter }),
        ...(courseFilter && { course: courseFilter })
      })
        .select("title subject description department course yr group totalMarks passingMarks startTime endTime durationMinutes durationSeconds isStarted allowedAttempts createdAt questions")
        .sort({ startTime: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      
      // Get all attempts for this student
      QuizAttempt.find({
        student: studentId
      })
        .select("quizId scoredMarks attemptedAt correctCount wrongCount timeTaken answers")
        .lean(),
      
      // Get total count for pagination
      Quiz.countDocuments({
        createdBy: facultyId,
        registeredStudents: studentId,
        ...(subjectFilter && { subject: subjectFilter }),
        ...(courseFilter && { course: courseFilter })
      })
    ]);

    const quizzes = quizzesResult;
    
    if (quizzes.length === 0) {
      return res.status(200).json({
        student: {
          basicInfo: {
            name: student.name,
            studentId: student.enrollmentNumber,
            gender: student.gender,
            course: student.course,
            group: student.group
          },
          contactInfo: {
            email: student.email,
            phone: student.phone
          },
          enrollmentDate: student.enrollmentDate
        },
        registrationStats: {
          totalRegisteredQuizzes: 0,
          message: "Student is not registered for any of your quizzes"
        }
      });
    }

    /* ================= CREATE ATTEMPT MAP ================= */
    const attemptMap = {};
    allAttempts.forEach(attempt => {
      attemptMap[attempt.quizId.toString()] = attempt;
    });

    /* ================= ANALYTICS VARIABLES ================= */
    const now = new Date();
    const analytics = {
      summary: {
        totalQuizzes: quizzes.length,
        attempted: 0,
        notAttempted: 0,
        active: 0,
        upcoming: 0,
        missed: 0,
        totalDurationMinutes: 0,
        totalPossibleMarks: 0
      },
      courseStats: {},
      subjectStats: {},
      departmentStats: {},
      performanceStats: {
        totalScoredMarks: 0,
        totalPossibleMarks: 0,
        totalTimeTaken: 0,
        totalCorrect: 0,
        totalWrong: 0,
        passedQuizzes: 0,
        failedQuizzes: 0
      },
      timeAnalysis: {
        byHour: {},
        byDay: {},
        byMonth: {}
      },
      difficultyAnalysis: {},
      topicAnalysis: {}
    };

    /* ================= PROCESS EACH QUIZ ================= */
    const formattedQuizzes = [];
    const attemptedQuizzesList = [];
    const nonAttemptedQuizzesList = [];

    for (const quiz of quizzes) {
      const quizIdStr = quiz._id.toString();
      const attempt = attemptMap[quizIdStr];
      
      const startTime = new Date(quiz.startTime);
      const endTime = new Date(quiz.endTime);
      
      // Calculate duration
      const durationMinutes = quiz.durationMinutes || 
        Math.round((endTime - startTime) / (1000 * 60));
      
      analytics.summary.totalDurationMinutes += durationMinutes;
      analytics.summary.totalPossibleMarks += quiz.totalMarks || 0;

      // Determine quiz status
      let status = "upcoming";
      let statusReason = "";
      let daysRemaining = 0;
      let isAttempted = false;
      let isMissed = false;
      let isActive = false;
      let isUpcoming = false;

      if (now < startTime) {
        status = "upcoming";
        daysRemaining = Math.ceil((startTime - now) / (1000 * 60 * 60 * 24));
        statusReason = `Starts in ${daysRemaining} day(s)`;
        isUpcoming = true;
        analytics.summary.upcoming++;
      } else if (now >= startTime && now <= endTime) {
        status = "active";
        const hoursLeft = Math.ceil((endTime - now) / (1000 * 60 * 60));
        statusReason = `${hoursLeft} hour(s) remaining`;
        isActive = true;
        analytics.summary.active++;
      } else {
        status = "completed";
        statusReason = "Quiz period has ended";
      }

      // Check if attempted
      let performance = null;
      if (attempt) {
        isAttempted = true;
        status = "attempted";
        analytics.summary.attempted++;
        
        const percentage = ((attempt.scoredMarks / quiz.totalMarks) * 100).toFixed(1);
        const passingMarks = quiz.passingMarks || (quiz.totalMarks * 0.4);
        const passed = attempt.scoredMarks >= passingMarks;
        
        performance = {
          scoredMarks: attempt.scoredMarks,
          totalMarks: quiz.totalMarks,
          percentage: percentage,
          passed: passed,
          attemptedAt: attempt.attemptedAt,
          timeTaken: attempt.timeTaken,
          correctCount: attempt.correctCount || 0,
          wrongCount: attempt.wrongCount || 0,
          accuracy: attempt.correctCount + attempt.wrongCount > 0 ?
            ((attempt.correctCount / (attempt.correctCount + attempt.wrongCount)) * 100).toFixed(1) : 0
        };

        // Update performance stats
        analytics.performanceStats.totalScoredMarks += attempt.scoredMarks;
        analytics.performanceStats.totalPossibleMarks += quiz.totalMarks;
        analytics.performanceStats.totalTimeTaken += attempt.timeTaken || 0;
        analytics.performanceStats.totalCorrect += attempt.correctCount || 0;
        analytics.performanceStats.totalWrong += attempt.wrongCount || 0;
        
        if (passed) {
          analytics.performanceStats.passedQuizzes++;
        } else {
          analytics.performanceStats.failedQuizzes++;
        }

        // Time analysis for attempted quizzes
        const attemptDate = new Date(attempt.attemptedAt);
        const hour = attemptDate.getHours();
        const day = attemptDate.toLocaleDateString('en-US', { weekday: 'long' });
        const month = attemptDate.toLocaleDateString('en-US', { month: 'long' });
        
        analytics.timeAnalysis.byHour[hour] = (analytics.timeAnalysis.byHour[hour] || 0) + 1;
        analytics.timeAnalysis.byDay[day] = (analytics.timeAnalysis.byDay[day] || 0) + 1;
        analytics.timeAnalysis.byMonth[month] = (analytics.timeAnalysis.byMonth[month] || 0) + 1;

        // Topic analysis from answers
        if (attempt.answers && Array.isArray(attempt.answers) && quiz.questions) {
          attempt.answers.forEach((answer, index) => {
            if (index < quiz.questions.length) {
              const question = quiz.questions[index];
              const topic = question.topic || question.category || "General";
              
              if (!analytics.topicAnalysis[topic]) {
                analytics.topicAnalysis[topic] = {
                  correct: 0,
                  total: 0,
                  totalMarks: 0,
                  obtainedMarks: 0
                };
              }
              
              analytics.topicAnalysis[topic].total++;
              if (answer.isCorrect || answer.correct) {
                analytics.topicAnalysis[topic].correct++;
              }
              
              const marksObtained = answer.marksObtained || (answer.isCorrect ? (question.marks || 1) : 0);
              analytics.topicAnalysis[topic].obtainedMarks += marksObtained;
              analytics.topicAnalysis[topic].totalMarks += question.marks || 1;
            }
          });
        }

        attemptedQuizzesList.push({
          quizId: quiz._id,
          title: quiz.title,
          subject: quiz.subject,
          performance: performance
        });
      } else if (status === "completed") {
        status = "missed";
        isMissed = true;
        statusReason = "Not attempted";
        analytics.summary.missed++;
        
        nonAttemptedQuizzesList.push({
          quizId: quiz._id,
          title: quiz.title,
          subject: quiz.subject,
          endTime: quiz.endTime,
          daysSinceEnd: Math.floor((now - endTime) / (1000 * 60 * 60 * 24))
        });
      }

      analytics.summary.notAttempted = quizzes.length - analytics.summary.attempted;

      // Course-wise stats
      if (Array.isArray(quiz.course)) {
        quiz.course.forEach(course => {
          if (!analytics.courseStats[course]) {
            analytics.courseStats[course] = {
              total: 0,
              attempted: 0,
              missed: 0,
              upcoming: 0,
              active: 0,
              totalMarks: 0,
              scoredMarks: 0
            };
          }
          
          analytics.courseStats[course].total++;
          analytics.courseStats[course].totalMarks += quiz.totalMarks || 0;
          
          if (isAttempted) {
            analytics.courseStats[course].attempted++;
            analytics.courseStats[course].scoredMarks += attempt.scoredMarks;
          } else if (isMissed) {
            analytics.courseStats[course].missed++;
          } else if (isActive) {
            analytics.courseStats[course].active++;
          } else if (isUpcoming) {
            analytics.courseStats[course].upcoming++;
          }
        });
      }

      // Subject-wise stats
      const subject = quiz.subject || "Unknown";
      if (!analytics.subjectStats[subject]) {
        analytics.subjectStats[subject] = {
          total: 0,
          attempted: 0,
          missed: 0
        };
      }
      analytics.subjectStats[subject].total++;
      if (isAttempted) analytics.subjectStats[subject].attempted++;
      if (isMissed) analytics.subjectStats[subject].missed++;

      // Department-wise stats
      const department = quiz.department || "Unknown";
      analytics.departmentStats[department] = (analytics.departmentStats[department] || 0) + 1;

      // Difficulty analysis based on duration
      const difficulty = durationMinutes > 60 ? "Hard" : 
                        durationMinutes > 30 ? "Medium" : "Easy";
      analytics.difficultyAnalysis[difficulty] = (analytics.difficultyAnalysis[difficulty] || 0) + 1;

      // Format quiz data
      formattedQuizzes.push({
        _id: quiz._id,
        title: quiz.title,
        subject: quiz.subject,
        description: quiz.description,
        department: quiz.department,
        course: quiz.course,
        yr: quiz.yr,
        group: quiz.group,
        totalMarks: quiz.totalMarks,
        passingMarks: quiz.passingMarks,
        startTime: quiz.startTime,
        endTime: quiz.endTime,
        durationMinutes: durationMinutes,
        durationSeconds: quiz.durationSeconds || durationMinutes * 60,
        isStarted: quiz.isStarted || false,
        allowedAttempts: quiz.allowedAttempts || 1,
        totalQuestions: quiz.questions?.length || 0,
        createdAt: quiz.createdAt,
        
        // Status information
        status: status,
        statusDetail: statusReason,
        isAttempted: isAttempted,
        isMissed: isMissed,
        isActive: isActive,
        isUpcoming: isUpcoming,
        daysRemaining: daysRemaining,
        
        // Performance data
        performance: performance,
        
        // Quiz metadata
        hasFeedback: (quiz.feedbacks && quiz.feedbacks.length > 0) || false,
        hasLeaderboard: !!quiz.leaderboard,
        certificatesGenerated: quiz.certificatesGenerated || false
      });
    }

    /* ================= CALCULATE ANALYTICS ================= */
    const attemptRate = analytics.summary.totalQuizzes > 0 ?
      ((analytics.summary.attempted / analytics.summary.totalQuizzes) * 100).toFixed(1) : 0;

    const overallPercentage = analytics.performanceStats.totalPossibleMarks > 0 ?
      ((analytics.performanceStats.totalScoredMarks / analytics.performanceStats.totalPossibleMarks) * 100).toFixed(1) : 0;

    const accuracy = analytics.performanceStats.totalCorrect + analytics.performanceStats.totalWrong > 0 ?
      ((analytics.performanceStats.totalCorrect / (analytics.performanceStats.totalCorrect + analytics.performanceStats.totalWrong)) * 100).toFixed(1) : 0;

    const passRate = analytics.summary.attempted > 0 ?
      ((analytics.performanceStats.passedQuizzes / analytics.summary.attempted) * 100).toFixed(1) : 0;

    const avgTimePerQuiz = analytics.summary.attempted > 0 ?
      Math.round(analytics.performanceStats.totalTimeTaken / analytics.summary.attempted) : 0;

    const efficiencyScore = analytics.performanceStats.totalTimeTaken > 0 ?
      ((analytics.performanceStats.totalScoredMarks / analytics.performanceStats.totalTimeTaken) * 60).toFixed(2) : 0;

    /* ================= COURSE PERFORMANCE ANALYSIS ================= */
    const coursePerformance = Object.keys(analytics.courseStats).map(course => {
      const stats = analytics.courseStats[course];
      return {
        course: course,
        totalQuizzes: stats.total,
        attempted: stats.attempted,
        missed: stats.missed,
        upcoming: stats.upcoming,
        active: stats.active,
        attemptRate: stats.total > 0 ? ((stats.attempted / stats.total) * 100).toFixed(1) : 0,
        averageScore: stats.attempted > 0 ? (stats.scoredMarks / stats.attempted).toFixed(2) : 0,
        averagePercentage: stats.totalMarks > 0 ? ((stats.scoredMarks / stats.totalMarks) * 100).toFixed(1) : 0
      };
    }).sort((a, b) => b.averagePercentage - a.averagePercentage);

    /* ================= TOPIC ANALYSIS ================= */
    const topicPerformance = Object.keys(analytics.topicAnalysis).map(topic => {
      const stats = analytics.topicAnalysis[topic];
      return {
        topic: topic,
        correct: stats.correct,
        total: stats.total,
        accuracy: ((stats.correct / stats.total) * 100).toFixed(1),
        marksEfficiency: stats.totalMarks > 0 ? ((stats.obtainedMarks / stats.totalMarks) * 100).toFixed(1) : 0
      };
    }).sort((a, b) => a.accuracy - b.accuracy);

    /* ================= TIME PATTERN ANALYSIS ================= */
    const mostActiveHour = Object.keys(analytics.timeAnalysis.byHour)
      .reduce((a, b) => analytics.timeAnalysis.byHour[a] > analytics.timeAnalysis.byHour[b] ? a : b, null);
    
    const mostActiveDay = Object.keys(analytics.timeAnalysis.byDay)
      .reduce((a, b) => analytics.timeAnalysis.byDay[a] > analytics.timeAnalysis.byDay[b] ? a : b, null);

    /* ================= FIND UPCOMING AND URGENT QUIZZES ================= */
    const upcomingQuizzes = formattedQuizzes.filter(q => q.isUpcoming);
    const activeQuizzes = formattedQuizzes.filter(q => q.isActive);
    const nextQuiz = upcomingQuizzes.length > 0 ? 
      upcomingQuizzes.reduce((a, b) => 
        new Date(a.startTime) < new Date(b.startTime) ? a : b
      ) : null;

    const highPriorityQuizzes = upcomingQuizzes.filter(q => 
      new Date(q.startTime) - now <= 2 * 24 * 60 * 60 * 1000 // Within 2 days
    );

    /* ================= PERFORMANCE LEVEL ================= */
    const avgScore = analytics.summary.attempted > 0 ?
      (analytics.performanceStats.totalScoredMarks / analytics.summary.attempted) : 0;
    
    const performanceLevel = avgScore >= 80 ? "Excellent" :
                            avgScore >= 70 ? "Good" :
                            avgScore >= 60 ? "Average" :
                            avgScore >= 50 ? "Below Average" : "Needs Improvement";

    /* ================= RECOMMENDATIONS ================= */
    const recommendations = {
      forFaculty: [],
      forStudent: [],
      priorityActions: []
    };

    // Faculty recommendations
    if (attemptRate < 30) {
      recommendations.forFaculty.push("Student needs encouragement to attempt more quizzes");
      recommendations.priorityActions.push("Schedule a meeting to discuss participation");
    } else if (attemptRate < 60) {
      recommendations.forFaculty.push("Student participation is moderate, could improve");
    } else {
      recommendations.forFaculty.push("Student shows good participation rate");
    }

    if (passRate < 50) {
      recommendations.forFaculty.push("Consider providing additional study materials or revision sessions");
      recommendations.forStudent.push("Focus on understanding core concepts better");
    }

    if (analytics.summary.missed > analytics.summary.attempted) {
      recommendations.forFaculty.push("Student is missing more quizzes than attempting");
      recommendations.priorityActions.push("Investigate reasons for low participation");
    }

    // Student recommendations
    recommendations.forStudent.push(
      `You have attempted ${analytics.summary.attempted} out of ${analytics.summary.totalQuizzes} quizzes (${attemptRate}%)`
    );
    
    if (nextQuiz) {
      recommendations.forStudent.push(
        `Next quiz: "${nextQuiz.title}" starts in ${nextQuiz.daysRemaining} day(s)`
      );
    }

    if (accuracy < 70) {
      recommendations.forStudent.push("Work on improving accuracy - focus on question understanding");
    }

    /* ================= FINAL RESPONSE ================= */
    res.status(200).json({
      student: {
        basicInfo: {
          name: student.name,
          studentId: student.enrollmentNumber,
          gender: student.gender,
          course: student.course,
          group: student.group
        },
        contactInfo: {
          email: student.email,
          phone: student.phone
        },
        enrollmentDate: student.enrollmentDate
      },

      summary: {
        totalRegisteredQuizzes: analytics.summary.totalQuizzes,
        attempted: analytics.summary.attempted,
        notAttempted: analytics.summary.notAttempted,
        attemptRate: `${attemptRate}%`,
        activeQuizzes: analytics.summary.active,
        upcomingQuizzes: analytics.summary.upcoming,
        missedQuizzes: analytics.summary.missed,
        totalStudyTime: `${Math.round(analytics.summary.totalDurationMinutes / 60)} hours`,
        averageQuizDuration: `${(analytics.summary.totalDurationMinutes / analytics.summary.totalQuizzes).toFixed(0)} minutes`
      },

      performance: analytics.summary.attempted > 0 ? {
        overallScore: `${overallPercentage}%`,
        averageScore: (analytics.performanceStats.totalScoredMarks / analytics.summary.attempted).toFixed(2),
        accuracy: `${accuracy}%`,
        passRate: `${passRate}%`,
        passedQuizzes: analytics.performanceStats.passedQuizzes,
        failedQuizzes: analytics.performanceStats.failedQuizzes,
        totalMarksObtained: analytics.performanceStats.totalScoredMarks,
        totalPossibleMarks: analytics.performanceStats.totalPossibleMarks,
        efficiencyScore: efficiencyScore,
        averageTimePerQuiz: avgTimePerQuiz,
        performanceLevel: performanceLevel
      } : null,

      analytics: {
        courseWise: coursePerformance,
        subjectWise: Object.keys(analytics.subjectStats).map(subject => ({
          subject: subject,
          ...analytics.subjectStats[subject],
          attemptRate: analytics.subjectStats[subject].total > 0 ?
            ((analytics.subjectStats[subject].attempted / analytics.subjectStats[subject].total) * 100).toFixed(1) : 0
        })),
        departmentWise: Object.keys(analytics.departmentStats).map(dept => ({
          department: dept,
          count: analytics.departmentStats[dept]
        })),
        topicPerformance: topicPerformance,
        difficultyDistribution: Object.keys(analytics.difficultyAnalysis).map(diff => ({
          difficulty: diff,
          count: analytics.difficultyAnalysis[diff],
          percentage: ((analytics.difficultyAnalysis[diff] / analytics.summary.totalQuizzes) * 100).toFixed(1)
        }))
      },

      patterns: {
        timePatterns: {
          mostActiveHour: mostActiveHour ? `${mostActiveHour}:00` : "No data",
          mostActiveDay: mostActiveDay || "No data",
          hourDistribution: Object.keys(analytics.timeAnalysis.byHour).map(hour => ({
            hour: `${hour}:00`,
            attempts: analytics.timeAnalysis.byHour[hour]
          })).sort((a, b) => parseInt(a.hour) - parseInt(b.hour)),
          dayDistribution: Object.keys(analytics.timeAnalysis.byDay).map(day => ({
            day: day,
            attempts: analytics.timeAnalysis.byDay[day]
          }))
        },
        attemptPatterns: {
          hasConsistentMisses: analytics.summary.missed > analytics.summary.attempted,
          improving: attemptedQuizzesList.length > 0 && 
            new Date(attemptedQuizzesList[0]?.performance?.attemptedAt || 0) > 
            new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
          needsAttention: activeQuizzes.length > 0 && analytics.summary.attempted === 0,
          bestSubject: coursePerformance[0]?.course || "No data",
          weakestSubject: coursePerformance[coursePerformance.length - 1]?.course || "No data"
        }
      },

      quizzes: {
        all: formattedQuizzes,
        attempted: attemptedQuizzesList,
        nonAttempted: nonAttemptedQuizzesList.slice(0, 10), // Top 10 recent misses
        upcoming: upcomingQuizzes,
        active: activeQuizzes,
        highPriority: highPriorityQuizzes,
        nextQuiz: nextQuiz
      },

      recommendations: recommendations,

      pagination: {
        page: page,
        limit: limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
        hasNext: page * limit < totalCount,
        hasPrev: page > 1
      },

      filtersApplied: {
        status: statusFilter,
        subject: subjectFilter,
        course: courseFilter
      }
    });

  } catch (error) {
    console.error("Comprehensive student registered quizzes error:", error);
    res.status(500).json({
      message: "Failed to fetch student registered quizzes",
      error: error.message
    });
  }
};









// this is for student(in dashboard)
exports.getStudentQuizAttemptsByFaculty = async (req, res) => {
  try {
    const facultyId = req.user._id;
    const { studentId } = req.params;

    /* ================= STUDENT ================= */
    const student = await Student.findById(studentId).select(
      "name enrollmentNumber gender course group department semester email mobileNumber"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    /* ================= FACULTY QUIZZES ================= */
    const quizzes = await Quiz.find({ createdBy: facultyId })
      .select("_id title course totalMarks startTime endTime durationSeconds subject department passingMarks questions durationMinutes");

    const quizMap = {};
    quizzes.forEach(q => {
      quizMap[q._id.toString()] = {
        _id: q._id,
        title: q.title,
        subject: q.subject,
        course: q.course,
        totalMarks: q.totalMarks,
        passingMarks: q.passingMarks,
        durationMinutes: q.durationMinutes,
        durationSeconds: q.durationSeconds || (q.durationMinutes * 60),
        questions: q.questions
      };
    });

    /* ================= ATTEMPTS ================= */
    const attempts = await QuizAttempt.find({
      quizId: { $in: quizzes.map(q => q._id) },
      student: studentId
    }).sort({ attemptedAt: -1 });

    /* ================= BASIC COUNTS ================= */
    const attemptedCount = attempts.length;
    const totalFacultyQuizzes = quizzes.length;
    const attemptRate = totalFacultyQuizzes === 0
      ? 0
      : ((attemptedCount / totalFacultyQuizzes) * 100).toFixed(2);

    if (attemptedCount === 0) {
      return res.status(200).json({
        student,
        totalFacultyQuizzes,
        attemptedCount: 0,
        attemptRate: "0%",
        message: "Student has not attempted any faculty quizzes yet"
      });
    }

    /* ================= SCORE STATS ================= */
    let maxAttempt = attempts[0];
    let minAttempt = attempts[0];
    let totalScore = 0;
    let totalTime = 0;

    const courseStats = {};
    const attemptsWithQuizData = []; // Store attempts with quiz data

    attempts.forEach(a => {
      const quiz = quizMap[a.quizId.toString()];
      
      // Add quiz data to attempt
      const attemptWithData = {
        ...a._doc,
        quizTitle: quiz?.title || "Unknown Quiz",
        subject: quiz?.subject || "General",
        course: quiz?.course?.[0] || "General",
        totalMarks: quiz?.totalMarks || 100,
        passingMarks: quiz?.passingMarks || 40,
        durationMinutes: quiz?.durationMinutes || 60,
        durationSeconds: quiz?.durationSeconds || 3600
      };
      attemptsWithQuizData.push(attemptWithData);

      totalScore += a.scoredMarks;
      totalTime += a.timeTaken;

      if (a.scoredMarks > maxAttempt.scoredMarks) maxAttempt = a;
      if (a.scoredMarks < minAttempt.scoredMarks) minAttempt = a;

      const course = quiz?.course?.[0] || "Unknown";
      if (!courseStats[course]) {
        courseStats[course] = { totalScore: 0, attempts: 0 };
      }
      courseStats[course].totalScore += a.scoredMarks;
      courseStats[course].attempts += 1;
    });

    const avgScore = (totalScore / attemptedCount).toFixed(2);
    const avgTimeTaken = Math.round(totalTime / attemptedCount);

    /* ================= COURSE PERFORMANCE ================= */
    const coursePerformance = Object.keys(courseStats).map(course => ({
      course,
      attempts: courseStats[course].attempts,
      avgScore: (courseStats[course].totalScore / courseStats[course].attempts).toFixed(2)
    })).sort((a, b) => b.avgScore - a.avgScore);

    /* ================= PERFORMANCE ANALYSIS ================= */
    let totalCorrect = 0;
    let totalWrong = 0;
    let passedQuizzes = 0;
    let failedQuizzes = 0;
    let totalQuestionsAttempted = 0;
    const subjectStats = {};
    const weeklyPerformance = {};

    attempts.forEach(attempt => {
      const quiz = quizMap[attempt.quizId.toString()];
      
      totalCorrect += attempt.correctCount || 0;
      totalWrong += attempt.wrongCount || 0;
      totalQuestionsAttempted += (attempt.correctCount || 0) + (attempt.wrongCount || 0);
      
      const passingMarks = quiz?.passingMarks || (quiz?.totalMarks * 0.4);
      if (attempt.scoredMarks >= passingMarks) {
        passedQuizzes++;
      } else {
        failedQuizzes++;
      }
      
      const subject = quiz?.subject || "General";
      if (!subjectStats[subject]) {
        subjectStats[subject] = { totalScore: 0, attempts: 0, totalMarks: 0 };
      }
      subjectStats[subject].totalScore += attempt.scoredMarks;
      subjectStats[subject].attempts += 1;
      subjectStats[subject].totalMarks += quiz?.totalMarks || 100;
      
      const attemptDate = new Date(attempt.attemptedAt);
      const weekNumber = getWeekNumber(attemptDate);
      const weekKey = `${attemptDate.getFullYear()}-W${weekNumber}`;
      
      if (!weeklyPerformance[weekKey]) {
        weeklyPerformance[weekKey] = { totalScore: 0, attempts: 0, totalMarks: 0 };
      }
      weeklyPerformance[weekKey].totalScore += attempt.scoredMarks;
      weeklyPerformance[weekKey].attempts += 1;
      weeklyPerformance[weekKey].totalMarks += quiz?.totalMarks || 100;
    });

    const accuracy = totalQuestionsAttempted > 0 ? 
      ((totalCorrect / totalQuestionsAttempted) * 100).toFixed(1) : 0;
    const passRate = ((passedQuizzes / attemptedCount) * 100).toFixed(1);
    const overallPercentage = ((totalScore / attempts.reduce((sum, a) => 
      sum + (quizMap[a.quizId.toString()]?.totalMarks || 100), 0)) * 100).toFixed(1);

    /* ================= SUBJECT-WISE PERFORMANCE ================= */
    const subjectPerformance = Object.keys(subjectStats).map(subject => ({
      subject,
      attempts: subjectStats[subject].attempts,
      avgScore: (subjectStats[subject].totalScore / subjectStats[subject].attempts).toFixed(2),
      avgPercentage: ((subjectStats[subject].totalScore / subjectStats[subject].totalMarks) * 100).toFixed(1)
    })).sort((a, b) => b.avgPercentage - a.avgPercentage);

    /* ================= WEEKLY TREND ANALYSIS ================= */
    const weeklyTrend = Object.keys(weeklyPerformance)
      .sort()
      .map(week => ({
        week: week.split('-W')[1],
        attempts: weeklyPerformance[week].attempts,
        avgPercentage: ((weeklyPerformance[week].totalScore / weeklyPerformance[week].totalMarks) * 100).toFixed(1)
      }));

    let performanceTrend = "Stable";
    if (weeklyTrend.length >= 2) {
      const latest = parseFloat(weeklyTrend[weeklyTrend.length - 1].avgPercentage);
      const previous = parseFloat(weeklyTrend[weeklyTrend.length - 2].avgPercentage);
      if (latest > previous + 5) performanceTrend = "Improving";
      else if (latest < previous - 5) performanceTrend = "Declining";
    }

    /* ================= QUESTION-LEVEL ANALYSIS ================= */
    const topicPerformance = {};
    attempts.forEach(attempt => {
      if (attempt.answers && Array.isArray(attempt.answers)) {
        const quiz = quizMap[attempt.quizId.toString()];
        if (quiz && quiz.questions) {
          attempt.answers.forEach((answer, index) => {
            if (index < quiz.questions.length) {
              const question = quiz.questions[index];
              const topic = "General"; // Default since there's no topic field
              
              if (!topicPerformance[topic]) {
                topicPerformance[topic] = { correct: 0, total: 0, totalMarks: 0, obtainedMarks: 0 };
              }
              
              topicPerformance[topic].total++;
              const questionMarks = question.marks || 1;
              const isCorrect = answer.selectedOption === question.correctAnswer;
              
              if (isCorrect) {
                topicPerformance[topic].correct++;
                topicPerformance[topic].obtainedMarks += questionMarks;
              }
              topicPerformance[topic].totalMarks += questionMarks;
            }
          });
        }
      }
    });

    const topicAnalysis = Object.keys(topicPerformance).map(topic => ({
      topic,
      correct: topicPerformance[topic].correct,
      total: topicPerformance[topic].total,
      accuracy: ((topicPerformance[topic].correct / topicPerformance[topic].total) * 100).toFixed(1),
      marksEfficiency: ((topicPerformance[topic].obtainedMarks / topicPerformance[topic].totalMarks) * 100).toFixed(1)
    }));

    /* ================= TIME EFFICIENCY ================= */
    const efficiencyScore = totalTime > 0 ? 
      ((totalScore / totalTime) * 60).toFixed(2) : 0;

    const timeEfficiency = attempts.map(attempt => {
      const quiz = quizMap[attempt.quizId.toString()];
      const maxTime = quiz?.durationSeconds || 3600;
      const timeEfficiencyPercent = maxTime > 0 ? 
        ((maxTime - attempt.timeTaken) / maxTime * 100).toFixed(1) : "0";
      
      return {
        quizTitle: quiz?.title || "Unknown Quiz",
        timeTaken: attempt.timeTaken,
        maxTime: maxTime,
        timeEfficiency: timeEfficiencyPercent,
        score: attempt.scoredMarks
      };
    });

    /* ================= PREDICTIVE ANALYSIS ================= */
    const performanceLevel = parseFloat(avgScore) >= 80 ? "Excellent" :
                            parseFloat(avgScore) >= 70 ? "Good" :
                            parseFloat(avgScore) >= 60 ? "Average" :
                            parseFloat(avgScore) >= 50 ? "Below Average" : "Needs Improvement";

    const estimatedGrade = performanceLevel;
    const predictedNextScore = (parseFloat(avgScore) + 
      (performanceTrend === "Improving" ? 5 : performanceTrend === "Declining" ? -5 : 0)).toFixed(1);

    /* ================= ACTIVITY PATTERNS ================= */
    const attemptDates = attempts.map(a => new Date(a.attemptedAt).toISOString().split('T')[0]);
    const uniqueAttemptDays = [...new Set(attemptDates)].length;
    const avgAttemptsPerDay = attemptedCount / uniqueAttemptDays;

    const dayCount = {};
    attemptDates.forEach(date => {
      dayCount[date] = (dayCount[date] || 0) + 1;
    });
    const mostActiveDay = Object.keys(dayCount).reduce((a, b) => 
      dayCount[a] > dayCount[b] ? a : b, "");

    /* ================= DETAILED RECOMMENDATIONS ================= */
    const strengths = subjectPerformance.slice(0, 2).map(s => s.subject);
    const weaknesses = subjectPerformance.slice(-2).map(s => s.subject);
    const weakTopics = topicAnalysis.slice(0, 3).map(t => t.topic);

    const detailedRecommendations = [
      parseFloat(avgScore) < 60 ? "Immediate remedial classes required" : 
      parseFloat(avgScore) < 70 ? "Additional practice material needed" : 
      "Encourage advanced problem-solving",
      
      parseFloat(accuracy) < 70 ? "Focus on conceptual clarity and fundamentals" : 
      "Provide challenging problems to enhance critical thinking",
      
      parseFloat(attemptRate) < 50 ? "Student needs motivation and regular follow-up" : 
      "Acknowledge consistent participation and effort",
      
      performanceTrend === "Declining" ? "Schedule one-on-one counseling session" : 
      performanceTrend === "Improving" ? "Continue current learning strategies" : 
      "Introduce new learning methods for better engagement"
    ];

    /* ================= RESPONSE ================= */
    res.status(200).json({
      // Send attempts with quiz data
      attempts: attemptsWithQuizData,
      quizData: quizMap,
      quizzes: quizzes.map(q => ({
        _id: q._id,
        title: q.title,
        subject: q.subject,
        course: q.course,
        totalMarks: q.totalMarks,
        passingMarks: q.passingMarks,
        durationMinutes: q.durationMinutes
      })),
      
      student,

      overview: {
        totalFacultyQuizzes,
        attemptedCount,
        attemptRate: `${attemptRate}%`,
        avgScore,
        avgTimeTaken,
        accuracy: `${accuracy}%`,
        passRate: `${passRate}%`,
        overallPercentage: `${overallPercentage}%`,
        efficiencyScore: efficiencyScore,
        performanceLevel: performanceLevel,
        performanceTrend: performanceTrend
      },

      highestScoreQuiz: {
        quizTitle: quizMap[maxAttempt.quizId.toString()]?.title || "Unknown",
        score: maxAttempt.scoredMarks,
        totalMarks: quizMap[maxAttempt.quizId.toString()]?.totalMarks || 100,
        course: quizMap[maxAttempt.quizId.toString()]?.course?.[0] || "General",
        attemptedAt: maxAttempt.attemptedAt,
        subject: quizMap[maxAttempt.quizId.toString()]?.subject || "General"
      },

      lowestScoreQuiz: {
        quizTitle: quizMap[minAttempt.quizId.toString()]?.title || "Unknown",
        score: minAttempt.scoredMarks,
        totalMarks: quizMap[minAttempt.quizId.toString()]?.totalMarks || 100,
        course: quizMap[minAttempt.quizId.toString()]?.course?.[0] || "General",
        attemptedAt: minAttempt.attemptedAt,
        subject: quizMap[minAttempt.quizId.toString()]?.subject || "General"
      },

      courseWisePerformance: coursePerformance,

      enhancedAnalytics: {
        subjectWisePerformance: subjectPerformance,
        
        accuracyAnalysis: {
          totalCorrect,
          totalWrong,
          totalQuestionsAttempted,
          accuracy: `${accuracy}%`,
          passFailRatio: `${passedQuizzes}/${failedQuizzes}`
        },
        
        timeAnalysis: {
          efficiencyScore: efficiencyScore,
          averageTimePerQuiz: avgTimeTaken,
          detailedTimeEfficiency: timeEfficiency
        },
        
        topicWisePerformance: topicAnalysis,
        
        weeklyPerformanceTrend: weeklyTrend,
        
        activityPatterns: {
          mostActiveDay: mostActiveDay,
          totalActiveDays: uniqueAttemptDays,
          averageAttemptsPerDay: avgAttemptsPerDay.toFixed(2),
          totalQuizTimeSpent: `${Math.round(totalTime / 60)} minutes`
        },
        
        predictiveInsights: {
          estimatedGrade: estimatedGrade,
          predictedNextScore: predictedNextScore,
          improvementAreas: weaknesses,
          strongAreas: strengths
        }
      },

      recommendations: {
        strength: coursePerformance[0]?.course || "Needs more data",
        improvementArea: coursePerformance[coursePerformance.length - 1]?.course || "Needs more data",
        advice: parseFloat(avgScore) >= 70
          ? "Student is performing well. Encourage advanced problem-solving."
          : "Student needs concept reinforcement and regular practice.",
        
        detailedSuggestions: detailedRecommendations,
        focusTopics: weakTopics,
        priorityActions: [
          weaknesses.length > 0 ? `Focus on improving ${weaknesses.join(', ')}` : 'Maintain current performance',
          parseFloat(accuracy) < 70 ? 'Work on question accuracy and reading comprehension' : 'Enhance speed and efficiency',
          performanceTrend === "Declining" ? 'Address declining performance immediately' : 'Continue current learning approach'
        ]
      },

      summary: {
        overallScore: `${overallPercentage}%`,
        accuracy: `${accuracy}%`,
        attempts: attemptedCount,
        trend: performanceTrend,
        grade: performanceLevel
      }
    });

  } catch (error) {
    console.error("Faculty student analytics error:", error);
    res.status(500).json({
      message: "Failed to fetch student analytics",
      error: error.message
    });
  }
}

// Helper function for week number
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}






























exports.getFacultyOwnQuizzes = async (req, res) => {
  try {
    const facultyId = req.user._id;
    const { 
      startDate, 
      endDate, 
      filter,
      searchQuery,
      courses,
      groups,
      minScore,
      maxScore,
      minRegistered,
      minAttempted,
      showBestScoresOnly,
      sortBy
    } = req.query;
    
    const now = new Date();

    // Build date filter if provided
    const dateFilter = {};
    if (startDate || endDate) {
      dateFilter.startTime = {};
      if (startDate) dateFilter.startTime.$gte = new Date(startDate);
      if (endDate) dateFilter.startTime.$lte = new Date(endDate);
    }

    // Build status filter
    const statusFilter = {};
    if (filter === 'ongoing') {
      statusFilter.startTime = { $lte: now };
      statusFilter.endTime = { $gte: now };
    } else if (filter === 'completed') {
      statusFilter.endTime = { $lt: now };
    }

    // Build course filter
    const courseFilter = {};
    if (courses && Array.isArray(courses)) {
      courseFilter.course = { $in: courses };
    }

    // Build search filter
    const searchFilter = {};
    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, 'i');
      searchFilter.$or = [
        { title: searchRegex },
        { subject: searchRegex },
        { department: searchRegex },
        { 'course': searchRegex }
      ];
    }

    /* ================= FETCH QUIZZES WITH FILTERS ================= */
    const quizzes = await Quiz.find({ 
      createdBy: facultyId,
      ...dateFilter,
      ...statusFilter,
      ...courseFilter,
      ...searchFilter
    })
      .sort({ createdAt: -1 })
      .lean();

    if (!quizzes || quizzes.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No quizzes found for this faculty",
        stats: {
          totalQuizzes: 0,
          ongoingQuizzes: 0,
          previousQuizzes: 0,
          global: {},
          courseWise: {},
          monthlyTrend: [],
          scoreDistribution: [],
          performanceTrend: []
        },
        ongoingQuizzes: [],
        previousQuizzes: []
      });
    }

    /* ================= QUIZ IDS ================= */
    const quizIds = quizzes.map(q => q._id);

    /* ================= ATTEMPT STATS WITH BEST SCORES ================= */
    const attemptStats = await QuizAttempt.aggregate([
      { $match: { quizId: { $in: quizIds } } },
      {
        $group: {
          _id: "$quizId",
          attemptedCount: { $sum: 1 },
          avgScore: { $avg: "$scoredMarks" },
          totalScore: { $sum: "$scoredMarks" },
          avgTimeTaken: { $avg: "$timeTaken" },
          bestScore: { $max: "$scoredMarks" },
          worstScore: { $min: "$scoredMarks" },
          totalCorrect: { $sum: "$correctCount" },
          totalWrong: { $sum: "$wrongCount" }
        }
      }
    ]);

    const attemptMap = {};
    attemptStats.forEach(a => {
      attemptMap[a._id.toString()] = {
        attemptedCount: a.attemptedCount,
        avgScore: a.avgScore,
        totalScore: a.totalScore,
        avgTimeTaken: a.avgTimeTaken,
        bestScore: a.bestScore,
        worstScore: a.worstScore,
        totalCorrect: a.totalCorrect,
        totalWrong: a.totalWrong
      };
    });

    /* ================= GLOBAL ACCUMULATORS ================= */
    let totalRegistered = 0;
    let totalAttempted = 0;
    let totalMarksSum = 0;
    let totalDurationSum = 0;
    let totalQuestionsSum = 0;
    let totalAvgScore = 0;
    let totalBestScore = 0;
    let totalQuizzesWithScores = 0;

    let earliestStartTime = null;
    let latestEndTime = null;
    let topQuizScore = 0;
    let topQuizName = '';
    let topQuizId = null;

    let ongoingQuizzes = [];
    let previousQuizzes = [];

    /* ================= COURSE-WISE & MONTHLY MAP ================= */
    const courseWiseStats = {};
    const monthlyData = {};
    const scoreDistribution = [];

    /* ================= PROCESS QUIZZES ================= */
    quizzes.forEach(quiz => {
      const registeredCount = quiz.registeredStudents?.length || 0;
      const attemptData = attemptMap[quiz._id.toString()] || { 
        attemptedCount: 0, 
        avgScore: 0,
        avgTimeTaken: 0,
        bestScore: 0,
        worstScore: 0,
        totalCorrect: 0,
        totalWrong: 0
      };
      const attemptedCount = attemptData.attemptedCount;
      const bestScore = attemptData.bestScore || 0;

      totalRegistered += registeredCount;
      totalAttempted += attemptedCount;
      totalMarksSum += quiz.totalMarks || 0;
      totalDurationSum += quiz.durationMinutes || 0;
      totalQuestionsSum += quiz.questions?.length || 0;
      totalAvgScore += attemptData.avgScore || 0;
      
      if (bestScore > 0) {
        totalBestScore += bestScore;
        totalQuizzesWithScores++;
      }

      // Track top quiz
      if (bestScore > topQuizScore) {
        topQuizScore = bestScore;
        topQuizName = quiz.title;
        topQuizId = quiz._id;
      }

      if (!earliestStartTime || quiz.startTime < earliestStartTime) {
        earliestStartTime = quiz.startTime;
      }

      if (!latestEndTime || quiz.endTime > latestEndTime) {
        latestEndTime = quiz.endTime;
      }

      // Monthly trend data
      const monthYear = quiz.createdAt.toLocaleString('en-US', { month: 'short', year: 'numeric' });
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          quizzes: 0,
          registered: 0,
          attempted: 0,
          avgScore: 0,
          bestScore: 0,
          scoreCount: 0
        };
      }
      monthlyData[monthYear].quizzes += 1;
      monthlyData[monthYear].registered += registeredCount;
      monthlyData[monthYear].attempted += attemptedCount;
      monthlyData[monthYear].avgScore += attemptData.avgScore || 0;
      monthlyData[monthYear].bestScore = Math.max(monthlyData[monthYear].bestScore, bestScore);
      monthlyData[monthYear].scoreCount += attemptedCount > 0 ? 1 : 0;

      const isOngoing = quiz.startTime <= now && quiz.endTime >= now;

      const formattedQuiz = {
        _id: quiz._id,
        title: quiz.title,
        subject: quiz.subject,
        description: quiz.description,
        department: quiz.department,
        course: quiz.course || [],
        yr: quiz.yr || [],
        group: quiz.group || [],
        startTime: quiz.startTime,
        endTime: quiz.endTime,
        totalMarks: quiz.totalMarks,
        durationMinutes: quiz.durationMinutes,
        passingMarks: quiz.passingMarks,
        createdAt: quiz.createdAt,

        registeredCount,
        attemptedCount,
        notAttemptedCount: Math.max(registeredCount - attemptedCount, 0),
        avgScore: attemptData.avgScore || 0,
        avgTimeTaken: attemptData.avgTimeTaken || 0,
        bestScore: bestScore,
        worstScore: attemptData.worstScore || 0,
        totalCorrect: attemptData.totalCorrect || 0,
        totalWrong: attemptData.totalWrong || 0,
        performanceRatio: registeredCount > 0 ? 
          (attemptData.avgScore / quiz.totalMarks) * 100 : 0,
        bestScorePercentage: quiz.totalMarks > 0 ? 
          (bestScore / quiz.totalMarks) * 100 : 0,

        status: isOngoing ? "ONGOING" : "COMPLETED"
      };

      // Add to score distribution
      if (bestScore > 0) {
        scoreDistribution.push({
          quizId: quiz._id,
          quizTitle: quiz.title,
          bestScore: bestScore,
          totalMarks: quiz.totalMarks,
          percentage: Math.round((bestScore / quiz.totalMarks) * 100),
          attemptedCount: attemptedCount,
          registeredCount: registeredCount
        });
      }

      /* ================= COURSE-WISE AGGREGATION ================= */
      (quiz.course || []).forEach(course => {
        if (!courseWiseStats[course]) {
          courseWiseStats[course] = {
            quizzesCount: 0,
            registeredCount: 0,
            attemptedCount: 0,
            notAttemptedCount: 0,
            totalMarks: 0,
            totalDuration: 0,
            totalScore: 0,
            totalAttempts: 0,
            bestScore: 0,
            totalBestScore: 0
          };
        }

        courseWiseStats[course].quizzesCount += 1;
        courseWiseStats[course].registeredCount += registeredCount;
        courseWiseStats[course].attemptedCount += attemptedCount;
        courseWiseStats[course].totalMarks += quiz.totalMarks || 0;
        courseWiseStats[course].totalDuration += quiz.durationMinutes || 0;
        courseWiseStats[course].totalScore += attemptData.avgScore || 0;
        courseWiseStats[course].totalAttempts += attemptedCount;
        courseWiseStats[course].bestScore = Math.max(courseWiseStats[course].bestScore, bestScore);
        courseWiseStats[course].totalBestScore += bestScore;
      });

      if (isOngoing) {
        ongoingQuizzes.push(formattedQuiz);
      } else {
        previousQuizzes.push(formattedQuiz);
      }
    });

    /* ================= FINAL COURSE-WISE DERIVED STATS ================= */
    Object.keys(courseWiseStats).forEach(course => {
      const c = courseWiseStats[course];

      c.notAttemptedCount = Math.max(c.registeredCount - c.attemptedCount, 0);

      c.attemptedRatio = c.registeredCount > 0
        ? Number((c.attemptedCount / c.registeredCount).toFixed(2))
        : 0;

      c.avgMarks = c.quizzesCount > 0
        ? Number((c.totalMarks / c.quizzesCount).toFixed(2))
        : 0;

      c.avgDuration = c.quizzesCount > 0
        ? Number((c.totalDuration / c.quizzesCount).toFixed(2))
        : 0;

      c.avgScore = c.totalAttempts > 0
        ? Number((c.totalScore / c.quizzesCount).toFixed(2))
        : 0;

      c.avgBestScore = c.quizzesCount > 0
        ? Number((c.totalBestScore / c.quizzesCount).toFixed(2))
        : 0;

      c.successRate = c.totalAttempts > 0
        ? Number((c.attemptedCount / c.totalAttempts * 100).toFixed(1))
        : 0;
    });

    /* ================= MONTHLY TREND DATA ================= */
    const monthlyTrend = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      quizzes: data.quizzes,
      registered: data.registered,
      attempted: data.attempted,
      avgScore: data.scoreCount > 0 ? Number((data.avgScore / data.scoreCount).toFixed(2)) : 0,
      bestScore: data.bestScore,
      attemptedRatio: data.registered > 0 ? Number((data.attempted / data.registered).toFixed(2)) : 0
    })).sort((a, b) => new Date(a.month) - new Date(b.month));

    /* ================= PERFORMANCE TREND DATA ================= */
    const performanceTrend = quizzes
      .filter(quiz => attemptMap[quiz._id.toString()]?.avgScore > 0)
      .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
      .map(quiz => {
        const attemptData = attemptMap[quiz._id.toString()] || {};
        return {
          date: new Date(quiz.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          avgScore: attemptData.avgScore || 0,
          bestScore: attemptData.bestScore || 0,
          totalMarks: quiz.totalMarks,
          attempted: attemptData.attemptedCount || 0,
          quizTitle: quiz.title
        };
      });

    /* ================= SCORE DISTRIBUTION DATA ================= */
    const sortedScoreDistribution = scoreDistribution
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 15);

    /* ================= GLOBAL DERIVED STATS ================= */
    const totalNotAttempted = Math.max(totalRegistered - totalAttempted, 0);
    const overallAvgScore = quizzes.length > 0 ? Number((totalAvgScore / quizzes.length).toFixed(2)) : 0;
    const avgBestScore = totalQuizzesWithScores > 0 ? Number((totalBestScore / totalQuizzesWithScores).toFixed(2)) : 0;
    const bestScorePercentage = totalMarksSum > 0 ? Number((topQuizScore / (totalMarksSum / quizzes.length)).toFixed(1)) : 0;

    const globalStats = {
      totalRegisteredStudents: totalRegistered,
      totalAttemptedStudents: totalAttempted,
      totalNotAttemptedStudents: totalNotAttempted,

      attemptedRatio: totalRegistered > 0
        ? Number((totalAttempted / totalRegistered).toFixed(2))
        : 0,

      avgTotalMarksSet: quizzes.length > 0
        ? Number((totalMarksSum / quizzes.length).toFixed(2))
        : 0,

      avgDurationMinutes: quizzes.length > 0
        ? Number((totalDurationSum / quizzes.length).toFixed(2))
        : 0,

      avgQuestionsPerQuiz: quizzes.length > 0
        ? Number((totalQuestionsSum / quizzes.length).toFixed(2))
        : 0,

      overallAvgScore,
      avgBestScore,
      bestScorePercentage,
      topQuizScore: `${topQuizScore}/${topQuizId ? (quizzes.find(q => q._id.toString() === topQuizId.toString())?.totalMarks || 'N/A') : 'N/A'}`,
      topQuizName,

      avgQuizPerformance: overallAvgScore > 0 
        ? Number(((overallAvgScore / (totalMarksSum / quizzes.length)) * 100).toFixed(1))
        : 0,

      earliestStartTime,
      latestEndTime,
      quizCreationRange: {
        earliest: quizzes[quizzes.length - 1]?.createdAt,
        latest: quizzes[0]?.createdAt
      }
    };

    /* ================= RESPONSE ================= */
    res.status(200).json({
      success: true,
      stats: {
        totalQuizzes: quizzes.length,
        ongoingQuizzes: ongoingQuizzes.length,
        previousQuizzes: previousQuizzes.length,
        global: globalStats,
        courseWise: courseWiseStats,
        monthlyTrend,
        scoreDistribution: sortedScoreDistribution,
        performanceTrend
      },
      ongoingQuizzes,
      previousQuizzes
    });

  } catch (error) {
    console.error("getFacultyOwnQuizzes error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch faculty quizzes",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


exports.getQuizRegisteredStudents = async (req, res) => {
  try {
    const facultyId = req.user._id;
    const { quizId } = req.params;
    const { page = 1, limit = 10, search = '', filter = 'all' } = req.query;

    /* ================= VALIDATE QUIZ ================= */
    const quiz = await Quiz.findOne({
      _id: quizId,
      createdBy: facultyId
    })
      .populate({
        path: "registeredStudents",
        select: "name enrollmentNumber course group department semester email mobileNumber gender createdAt"
      })
      .lean();

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found or not authorized"
      });
    }

    /* ================= GET ATTEMPT STATISTICS ================= */
    const attempts = await QuizAttempt.find({ quizId })
      .populate({
        path: "student",
        select: "_id name studentId"
      })
      .sort({ attemptedAt: -1 })
      .lean();

    // Initialize statistics with default values
    const studentAttemptsMap = {};
    const studentPerformanceMap = {};
    let totalAttempts = 0;
    let totalScoredMarks = 0;
    let highestScore = 0;
    let lowestScore = quiz.totalMarks || 0;
    const attemptedStudents = new Set();
    const scoreDistribution = {
      '0-20%': 0,
      '21-40%': 0,
      '41-60%': 0,
      '61-80%': 0,
      '81-100%': 0
    };
    const dailyPerformance = {};
    const hourlyDistribution = Array(24).fill(0);

    // Calculate statistics
    if (attempts && attempts.length > 0) {
      attempts.forEach(attempt => {
        const studentId = attempt.student?._id?.toString();
        if (!studentId) return;
        
        const attemptDate = new Date(attempt.attemptedAt);
        const dateKey = attemptDate.toISOString().split('T')[0];
        const hour = attemptDate.getHours();
        
        // Initialize student data
        if (!studentAttemptsMap[studentId]) {
          studentAttemptsMap[studentId] = {
            attempts: 0,
            totalScored: 0,
            avgScore: 0,
            bestScore: 0,
            worstScore: quiz.totalMarks || 0,
            timeTaken: 0,
            attemptsHistory: [],
            firstAttempt: null,
            lastAttempt: null,
            avgTimePerQuestion: 0
          };
        }

        const studentStat = studentAttemptsMap[studentId];
        studentStat.attempts++;
        studentStat.totalScored += attempt.scoredMarks || 0;
        
        // Update best and worst scores
        studentStat.bestScore = Math.max(studentStat.bestScore, attempt.scoredMarks || 0);
        studentStat.worstScore = Math.min(studentStat.worstScore, attempt.scoredMarks || 0);
        
        studentStat.timeTaken += attempt.timeTaken || 0;
        studentStat.attemptsHistory.push({
          scoredMarks: attempt.scoredMarks || 0,
          date: dateKey,
          time: attemptDate.toISOString(),
          correctCount: attempt.correctCount || 0,
          wrongCount: attempt.wrongCount || 0,
          timeTaken: attempt.timeTaken || 0,
          percentage: quiz.totalMarks > 0 ? parseFloat((((attempt.scoredMarks || 0) / quiz.totalMarks) * 100).toFixed(2)) : 0
        });

        // Update first and last attempt times
        if (!studentStat.firstAttempt || attemptDate < new Date(studentStat.firstAttempt)) {
          studentStat.firstAttempt = attemptDate.toISOString();
        }
        if (!studentStat.lastAttempt || attemptDate > new Date(studentStat.lastAttempt)) {
          studentStat.lastAttempt = attemptDate.toISOString();
        }

        totalAttempts++;
        totalScoredMarks += attempt.scoredMarks || 0;
        highestScore = Math.max(highestScore, attempt.scoredMarks || 0);
        lowestScore = Math.min(lowestScore, attempt.scoredMarks || 0);
        attemptedStudents.add(studentId);

        // Score distribution
        if (quiz.totalMarks > 0) {
          const percentage = ((attempt.scoredMarks || 0) / quiz.totalMarks) * 100;
          if (percentage <= 20) scoreDistribution['0-20%']++;
          else if (percentage <= 40) scoreDistribution['21-40%']++;
          else if (percentage <= 60) scoreDistribution['41-60%']++;
          else if (percentage <= 80) scoreDistribution['61-80%']++;
          else scoreDistribution['81-100%']++;
        }

        // Daily performance
        dailyPerformance[dateKey] = (dailyPerformance[dateKey] || 0) + 1;

        // Hourly distribution
        if (hour >= 0 && hour < 24) {
          hourlyDistribution[hour]++;
        }
      });

      // Calculate average time per question for each student
      Object.keys(studentAttemptsMap).forEach(studentId => {
        const stat = studentAttemptsMap[studentId];
        if (stat.attempts > 0) {
          stat.avgScore = parseFloat((stat.totalScored / stat.attempts).toFixed(2));
          const totalQuestionsAttempted = stat.attempts * (quiz.questions?.length || 1);
          stat.avgTimePerQuestion = totalQuestionsAttempted > 0 ? 
            parseFloat((stat.timeTaken / totalQuestionsAttempted).toFixed(2)) : 0;
        }
      });
    }

    /* ================= FORMAT STUDENTS WITH STATISTICS ================= */
    const allStudents = (quiz.registeredStudents || []).map(student => {
      const studentId = student._id.toString();
      const attemptStats = studentAttemptsMap[studentId] || {
        attempts: 0,
        totalScored: 0,
        avgScore: 0,
        bestScore: 0,
        worstScore: 0,
        timeTaken: 0,
        status: "Not Attempted",
        avgTimePerQuestion: 0,
        firstAttempt: null,
        lastAttempt: null,
        attemptsHistory: []
      };

      const avgScore = attemptStats.attempts > 0 
        ? parseFloat((attemptStats.totalScored / attemptStats.attempts).toFixed(2))
        : 0;

      const performancePercentage = attemptStats.bestScore > 0 && quiz.totalMarks > 0
        ? parseFloat(((attemptStats.bestScore / quiz.totalMarks) * 100).toFixed(2))
        : 0;

      const improvement = attemptStats.attempts > 1 && quiz.totalMarks > 0
        ? parseFloat(((attemptStats.bestScore - attemptStats.worstScore) / quiz.totalMarks * 100).toFixed(2))
        : 0;

      return {
        _id: student._id,
        name: student.name || 'N/A',
        enrollmentNumber: student.studentId || 'N/A',
        course: student.course || 'N/A',
        group: student.group || 'N/A',
        semester: student.semester || 'N/A',
        department: student.department || 'N/A',
        email: student.email || 'N/A',
        mobileNumber: student.mobileNumber || 'N/A',
        gender: student.gender || 'Other',
        registrationDate: student.createdAt || new Date(),
        attempts: attemptStats.attempts,
        avgScore: avgScore,
        bestScore: attemptStats.bestScore,
        worstScore: attemptStats.worstScore,
        totalTimeTaken: attemptStats.timeTaken,
        avgTimePerQuestion: attemptStats.avgTimePerQuestion,
        status: attemptStats.attempts > 0 ? "Attempted" : "Not Attempted",
        hasAttempted: attemptStats.attempts > 0,
        performancePercentage: performancePercentage,
        firstAttempt: attemptStats.firstAttempt,
        lastAttempt: attemptStats.lastAttempt,
        improvement: improvement,
        attemptsHistory: attemptStats.attemptsHistory || []
      };
    });

    /* ================= APPLY FILTERS AND SEARCH ================= */
    let filteredStudents = allStudents;

    if (search) {
      const searchLower = search.toLowerCase();
      filteredStudents = filteredStudents.filter(student => 
        (student.name && student.name.toLowerCase().includes(searchLower)) ||
        (student.enrollmentNumber && student.enrollmentNumber.toLowerCase().includes(searchLower)) ||
        (student.email && student.email.toLowerCase().includes(searchLower))
      );
    }

    if (filter !== 'all') {
      filteredStudents = filteredStudents.filter(student => {
        switch(filter) {
          case 'attempted': return student.hasAttempted;
          case 'not_attempted': return !student.hasAttempted;
          case 'passed': return student.bestScore >= (quiz.passingMarks || 0);
          case 'failed': return student.hasAttempted && student.bestScore < (quiz.passingMarks || 0);
          case 'excellent': return student.performancePercentage >= 80;
          case 'good': return student.performancePercentage >= 60 && student.performancePercentage < 80;
          case 'average': return student.performancePercentage >= 40 && student.performancePercentage < 60;
          case 'poor': return student.hasAttempted && student.performancePercentage < 40;
          default: return true;
        }
      });
    }

    /* ================= PAGINATION ================= */
    const total = filteredStudents.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + parseInt(limit), total);
    const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

    /* ================= CALCULATE OVERALL STATISTICS ================= */
    const totalStudents = allStudents.length;
    const attemptedCount = attemptedStudents.size;
    const notAttemptedCount = totalStudents - attemptedCount;
    const avgScoreOverall = attempts.length > 0 
      ? parseFloat((totalScoredMarks / attempts.length).toFixed(2))
      : 0;
    const avgAttempts = attempts.length > 0 && attemptedCount > 0
      ? parseFloat((totalAttempts / attemptedCount).toFixed(2))
      : 0;
    
    // Calculate pass percentage
    const passedStudents = allStudents.filter(s => s.bestScore >= (quiz.passingMarks || 0)).length;
    const passPercentage = totalStudents > 0 ? parseFloat((passedStudents / totalStudents * 100).toFixed(2)) : 0;

    /* ================= GROUP STATISTICS ================= */
    const groupStats = {};
    const genderStats = { Male: 0, Female: 0, Other: 0 };
    const departmentStats = {};
    const performanceStats = {
      excellent: 0,
      good: 0,
      average: 0,
      poor: 0,
      not_attempted: 0
    };
    
    allStudents.forEach(student => {
      // Group by course/semester/group
      const key = `${student.course}-${student.semester}-${student.group}`;
      if (!groupStats[key]) {
        groupStats[key] = {
          course: student.course,
          semester: student.semester,
          group: student.group,
          count: 0,
          attempted: 0,
          avgScore: 0,
          bestAvgScore: 0,
          passRate: 0
        };
      }
      groupStats[key].count++;
      if (student.hasAttempted) {
        groupStats[key].attempted++;
        groupStats[key].avgScore += student.avgScore;
        groupStats[key].bestAvgScore += student.bestScore;
        if (student.bestScore >= (quiz.passingMarks || 0)) {
          groupStats[key].passRate++;
        }
      }

      // Gender count
      if (student.gender && genderStats[student.gender] !== undefined) {
        genderStats[student.gender] = (genderStats[student.gender] || 0) + 1;
      }

      // Department count
      departmentStats[student.department] = (departmentStats[student.department] || 0) + 1;

      // Performance categorization
      if (student.performancePercentage >= 80) performanceStats.excellent++;
      else if (student.performancePercentage >= 60) performanceStats.good++;
      else if (student.performancePercentage >= 40) performanceStats.average++;
      else if (student.hasAttempted) performanceStats.poor++;
      else performanceStats.not_attempted++;
    });

    // Calculate averages for each group
    Object.keys(groupStats).forEach(key => {
      if (groupStats[key].attempted > 0) {
        groupStats[key].avgScore = parseFloat((groupStats[key].avgScore / groupStats[key].attempted).toFixed(2));
        groupStats[key].bestAvgScore = parseFloat((groupStats[key].bestAvgScore / groupStats[key].attempted).toFixed(2));
        groupStats[key].passRate = parseFloat(((groupStats[key].passRate / groupStats[key].attempted) * 100).toFixed(2));
      }
    });

    /* ================= TIME ANALYSIS ================= */
    const timeStats = {
      avgTimePerAttempt: attempts.length > 0 ? parseFloat((allStudents.reduce((sum, s) => sum + (s.totalTimeTaken || 0), 0) / attempts.length).toFixed(2)) : 0,
      fastestAttempt: attempts.length > 0 ? Math.min(...allStudents.filter(s => s.hasAttempted).map(s => s.totalTimeTaken || 0)) : 0,
      slowestAttempt: attempts.length > 0 ? Math.max(...allStudents.filter(s => s.hasAttempted).map(s => s.totalTimeTaken || 0)) : 0,
      hourlyDistribution: hourlyDistribution.map((count, hour) => ({
        hour: `${hour}:00`,
        count
      })).filter(item => item.count > 0)
    };

    /* ================= PERFORMANCE TREND DATA ================= */
    const trendData = Object.keys(dailyPerformance).sort().map(date => ({
      date,
      attempts: dailyPerformance[date],
      avgScore: attempts.length > 0 ? parseFloat((
        attempts
          .filter(a => a.attemptedAt && new Date(a.attemptedAt).toISOString().split('T')[0] === date)
          .reduce((sum, a) => sum + (a.scoredMarks || 0), 0) / (dailyPerformance[date] || 1)
      ).toFixed(2)) : 0
    }));

    /* ================= ENSURE ALL STATISTICS EXIST ================= */
    const statistics = {
      totalStudents,
      registeredCount: totalStudents,
      attemptedCount,
      notAttemptedCount,
      attemptRate: totalStudents > 0 ? parseFloat(((attemptedCount / totalStudents) * 100).toFixed(2)) : 0,
      totalAttempts,
      avgScoreOverall,
      avgAttempts,
      highestScore,
      lowestScore: lowestScore,
      passPercentage,
      passedStudents,
      failedStudents: totalStudents - passedStudents,
      genderDistribution: genderStats,
      departmentDistribution: departmentStats,
      scoreDistribution,
      performanceStats,
      timeStats,
      avgTimePerAttempt: timeStats.avgTimePerAttempt
    };

    /* ================= RESPONSE ================= */
    res.status(200).json({
      success: true,
      quiz: {
        _id: quiz._id,
        title: quiz.title || 'Untitled Quiz',
        subject: quiz.subject || 'No Subject',
        description: quiz.description || '',
        department: quiz.department || 'No Department',
        course: Array.isArray(quiz.course) ? quiz.course : [quiz.course || 'No Course'],
        group: Array.isArray(quiz.group) ? quiz.group : [quiz.group || 'No Group'],
        totalMarks: quiz.totalMarks || 0,
        passingMarks: quiz.passingMarks || 0,
        durationMinutes: quiz.durationMinutes || 0,
        totalQuestions: quiz.questions?.length || 0,
        startTime: quiz.startTime,
        endTime: quiz.endTime,
        isStarted: quiz.isStarted || false,
        createdAt: quiz.createdAt
      },
      statistics: statistics,
      groupWiseStats: Object.values(groupStats) || [],
      performanceTrend: trendData,
      timeAnalysis: timeStats,
      students: paginatedStudents,
      pagination: {
        total: total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      filters: {
        search,
        activeFilter: filter,
        availableFilters: ['all', 'attempted', 'not_attempted', 'passed', 'failed', 'excellent', 'good', 'average', 'poor']
      }
    });
  } catch (error) {
    console.error("getQuizRegisteredStudents error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch registered students",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};





exports.getQuizRegisteredStudents = async (req, res) => {
  try {
    const facultyId = req.user._id;
    const { quizId } = req.params;

    /* ================= VALIDATE QUIZ ================= */
    const quiz = await Quiz.findOne({
      _id: quizId,
      createdBy: facultyId
    })
      .populate({
        path: "registeredStudents",
        select:
          "name enrollmnentNumber course group department semester email mobileNumber gender"
      })
      .lean();

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found or not authorized"
      });
    }

    /* ================= GET ATTEMPT STATISTICS ================= */
    const attempts = await QuizAttempt.find({ quizId })
      .populate({
        path: "student",
        select: "_id"
      })
      .lean();

    // Create a map of student attempts
    const studentAttemptsMap = {};
    let totalAttempts = 0;
    let totalScoredMarks = 0;
    let highestScore = 0;
    let lowestScore = null;
    const attemptedStudents = new Set();

    attempts.forEach(attempt => {
      const studentId = attempt.student._id.toString();
      
      // Initialize student data if not exists
      if (!studentAttemptsMap[studentId]) {
        studentAttemptsMap[studentId] = {
          attempts: 0,
          totalScored: 0,
          avgScore: 0,
          bestScore: 0,
          timeTaken: 0
        };
      }

      studentAttemptsMap[studentId].attempts++;
      studentAttemptsMap[studentId].totalScored += attempt.scoredMarks;
      studentAttemptsMap[studentId].bestScore = Math.max(
        studentAttemptsMap[studentId].bestScore,
        attempt.scoredMarks
      );
      studentAttemptsMap[studentId].timeTaken += attempt.timeTaken || 0;

      totalAttempts++;
      totalScoredMarks += attempt.scoredMarks;
      highestScore = Math.max(highestScore, attempt.scoredMarks);
      lowestScore = lowestScore === null ? attempt.scoredMarks : Math.min(lowestScore, attempt.scoredMarks);
      attemptedStudents.add(studentId);
    });

    /* ================= FORMAT STUDENTS WITH STATISTICS ================= */
    const students = (quiz.registeredStudents || []).map(student => {
      const studentId = student._id.toString();
      const attemptStats = studentAttemptsMap[studentId] || {
        attempts: 0,
        totalScored: 0,
        avgScore: 0,
        bestScore: 0,
        timeTaken: 0,
        status: "Not Attempted"
      };

      return {
        _id: student._id,
        name: student.name,
        enrollmentNumber: student.studentId,
        course: student.course,
        group: student.group,
        semester: student.semester,
        department: student.department,
        email: student.email,
        mobileNumber: student.mobileNumber,
        gender: student.gender,
        attempts: attemptStats.attempts,
        avgScore: attemptStats.attempts > 0 
          ? (attemptStats.totalScored / attemptStats.attempts).toFixed(2)
          : 0,
        bestScore: attemptStats.bestScore,
        totalTimeTaken: attemptStats.timeTaken,
        status: attemptStats.attempts > 0 ? "Attempted" : "Not Attempted",
        hasAttempted: attemptStats.attempts > 0
      };
    });

    /* ================= CALCULATE OVERALL STATISTICS ================= */
    const totalStudents = students.length;
    const attemptedCount = attemptedStudents.size;
    const notAttemptedCount = totalStudents - attemptedCount;
    const avgScoreOverall = attempts.length > 0 
      ? (totalScoredMarks / attempts.length).toFixed(2)
      : 0;
    const avgAttempts = attempts.length > 0 
      ? (totalAttempts / attemptedCount).toFixed(2)
      : 0;

    /* ================= GROUP STATISTICS ================= */
    const groupStats = {};
    const genderStats = { Male: 0, Female: 0, Other: 0 };
    
    students.forEach(student => {
      // Group by course/semester/group
      const key = `${student.course}-${student.semester}-${student.group}`;
      if (!groupStats[key]) {
        groupStats[key] = {
          course: student.course,
          semester: student.semester,
          group: student.group,
          count: 0,
          attempted: 0,
          avgScore: 0
        };
      }
      groupStats[key].count++;
      if (student.hasAttempted) {
        groupStats[key].attempted++;
        groupStats[key].avgScore += parseFloat(student.avgScore);
      }

      // Gender count
      genderStats[student.gender] = (genderStats[student.gender] || 0) + 1;
    });

    // Calculate average score for each group
    Object.keys(groupStats).forEach(key => {
      if (groupStats[key].attempted > 0) {
        groupStats[key].avgScore = (groupStats[key].avgScore / groupStats[key].attempted).toFixed(2);
      }
    });

    /* ================= RESPONSE ================= */
    res.status(200).json({
      success: true,

      quiz: {
        _id: quiz._id,
        title: quiz.title,
        subject: quiz.subject,
        description: quiz.description,
        department: quiz.department,
        course: quiz.course,
        group: quiz.group,
        totalMarks: quiz.totalMarks,
        passingMarks: quiz.passingMarks,
        durationMinutes: quiz.durationMinutes,
        startTime: quiz.startTime,
        endTime: quiz.endTime,
        isStarted: quiz.isStarted
      },

      statistics: {
        totalStudents,
        registeredCount: totalStudents,
        attemptedCount,
        notAttemptedCount,
        attemptRate: totalStudents > 0 ? ((attemptedCount / totalStudents) * 100).toFixed(2) + '%' : '0%',
        totalAttempts,
        avgScoreOverall,
        avgAttempts,
        highestScore,
        lowestScore: lowestScore || 0,
        genderDistribution: genderStats
      },

      groupWiseStats: Object.values(groupStats),

      students,
      registeredCount: totalStudents
    });
  } catch (error) {
    console.error("getQuizRegisteredStudents error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch registered students",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};











exports.getQuizAttemptedStudents = async (req, res) => {
  try {
    const facultyId = req.user._id;
    const { quizId } = req.params;

    /* ================= VERIFY QUIZ ================= */
    const quiz = await Quiz.findOne({
      _id: quizId,
      createdBy: facultyId
    }).select(
      "title subject description department course group totalMarks passingMarks durationMinutes startTime endTime"
    ).lean();

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found or not authorized"
      });
    }

    /* ================= FETCH ATTEMPTS WITH ADVANCED STATS ================= */
    const attempts = await QuizAttempt.find({ quizId })
      .populate({
        path: "student",
        select:
          "name studentId course group department semester email mobileNumber gender"
      })
      .sort({ scoredMarks: -1, submittedAt: -1 })
      .lean();

    /* ================= CALCULATE DEEP ANALYTICS ================= */
    const analytics = {
      totalAttempts: attempts.length,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      passingRate: 0,
      timeStats: {
        averageTime: 0,
        fastestTime: Infinity,
        slowestTime: 0
      },
      departmentStats: {},
      courseStats: {},
      groupStats: {},
      performanceDistribution: {
        excellent: 0, // 90-100%
        good: 0,      // 75-89%
        average: 0,   // 50-74%
        poor: 0,      // 25-49%
        fail: 0       // 0-24%
      }
    };

    if (attempts.length > 0) {
      let totalScore = 0;
      let totalTime = 0;
      let passedCount = 0;

      attempts.forEach(attempt => {
        const score = attempt.scoredMarks || 0;
        const percentage = quiz.totalMarks > 0 ? (score / quiz.totalMarks) * 100 : 0;
        const passed = score >= quiz.passingMarks; // FIXED: Use passing marks from quiz
        
        // Update basic stats
        totalScore += score;
        totalTime += attempt.timeTaken || 0;
        
        if (passed) passedCount++;
        
        // Update high/low scores
        analytics.highestScore = Math.max(analytics.highestScore, score);
        analytics.lowestScore = attempts.length === 1 ? score : Math.min(analytics.lowestScore || Infinity, score);
        
        // Update time stats
        if (attempt.timeTaken) {
          analytics.timeStats.fastestTime = Math.min(analytics.timeStats.fastestTime, attempt.timeTaken);
          analytics.timeStats.slowestTime = Math.max(analytics.timeStats.slowestTime, attempt.timeTaken);
        }
        
        // Performance distribution
        if (percentage >= 90) analytics.performanceDistribution.excellent++;
        else if (percentage >= 75) analytics.performanceDistribution.good++;
        else if (percentage >= 50) analytics.performanceDistribution.average++;
        else if (percentage >= 25) analytics.performanceDistribution.poor++;
        else analytics.performanceDistribution.fail++;
        
        // Department stats
        const dept = attempt.student?.department || 'Unknown';
        analytics.departmentStats[dept] = (analytics.departmentStats[dept] || 0) + 1;
        
        // Course stats
        const course = attempt.student?.course || 'Unknown';
        analytics.courseStats[course] = (analytics.courseStats[course] || 0) + 1;
        
        // Group stats
        const group = attempt.student?.group || 'Unknown';
        analytics.groupStats[group] = (analytics.groupStats[group] || 0) + 1;
      });

      analytics.averageScore = totalScore / attempts.length;
      analytics.timeStats.averageTime = totalTime / attempts.length;
      analytics.passingRate = (passedCount / attempts.length) * 100;
    }

    /* ================= FORMAT STUDENT RESPONSE ================= */
    const attemptedStudents = attempts.map((attempt, index) => {
      const score = attempt.scoredMarks || 0;
      const percentage = quiz.totalMarks > 0 ? (score / quiz.totalMarks * 100) : 0;
      const passed = score >= quiz.passingMarks; // FIXED: Use quiz.passingMarks
      
      return {
        attemptId: attempt._id,
        rank: index + 1,
        
        student: {
          _id: attempt.student?._id,
          name: attempt.student?.name,
          enrollmentNumber: attempt.student?.studentId,
          course: attempt.student?.course,
          group: attempt.student?.group,
          semester: attempt.student?.semester,
          department: attempt.student?.department,
          email: attempt.student?.email,
          mobileNumber: attempt.student?.mobileNumber,
          gender: attempt.student?.gender
        },

        score: score,
        totalMarks: quiz.totalMarks, // Use quiz total marks
        passingMarks: quiz.passingMarks, // Add passing marks to response
        percentage: percentage.toFixed(2),
        correctCount: attempt.correctCount || 0,
        wrongCount: attempt.wrongCount || 0,
        timeTaken: attempt.timeTaken || 0,
        
        startedAt: attempt.startedAt,
        submittedAt: attempt.submittedAt,
        attemptedAt: attempt.attemptedAt,
        
        status: attempt.submittedAt ? "Submitted" : "In Progress",
        passed: passed // This is now correct
      };
    });

    /* ================= PREPARE CHART DATA ================= */
    const chartData = {
      scores: attemptedStudents.map(s => s.score),
      times: attemptedStudents.map(s => s.timeTaken),
      performanceDistribution: analytics.performanceDistribution,
      departmentDistribution: Object.entries(analytics.departmentStats).map(([name, value]) => ({ name, value })),
      courseDistribution: Object.entries(analytics.courseStats).map(([name, value]) => ({ name, value }))
    };

    /* ================= RESPONSE ================= */
    res.status(200).json({
      success: true,

      quiz: {
        _id: quiz._id,
        title: quiz.title,
        subject: quiz.subject,
        description: quiz.description,
        department: quiz.department,
        course: quiz.course,
        group: quiz.group,
        totalMarks: quiz.totalMarks,
        passingMarks: quiz.passingMarks,
        durationMinutes: quiz.durationMinutes,
        startTime: quiz.startTime,
        endTime: quiz.endTime
      },

      analytics,
      attemptedCount: attemptedStudents.length,
      attemptedStudents,
      chartData
    });
  } catch (error) {
    console.error("getQuizAttemptedStudents error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch attempted students"
    });
  }
};
