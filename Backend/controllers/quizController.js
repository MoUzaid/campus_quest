const Quiz = require('../models/quizModel');
const Student = require('../models/studentModel');
const sendEmail = require('../utils/sendEmail');
const Leaderboard = require('../models/leaderboardModel');
const QuizAttempt = require('../models/QuizAttemptModel');
const cloudinary = require('../config/cloudinary');

// Lazy load io to avoid circular dependency
const getIo = () => {
  try {
    return require('../server').io;
  } catch (error) {
    console.warn('io not available yet');
    return null;
  }
};
const Faculty = require('../models/FacultyModel');
const superAdmin = require('../models/superAdminModel');
const generateCertificatePDF = require('../utils/generateCertificatePDF');
const  {createFacultyActivity}  = require("./FacultyActivityController");
const uploadCertificateToCloudinary = require('../utils/uploadCertificate');


function shuffleArray(array) {
  const shuffled = [...array]; // copy (important)

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}


const QuizCtrl = {
 createQuiz : async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    // 🔹 1. Extract data correctly from quizData
    const {
      quizTitle,
      subject,
      description,
      department,
      selectedCourses,
      selectedYears,
      selectedGroups,
      questions,
      passingMarks,
      totalMarks,
      startDate,
      startTime,
      endDate,
      endTime,
      durationMinutes,
    } = req.body.quizData;

    // 🔹 2. Validate required fields
    if (!quizTitle || !subject || !questions || questions.length === 0) {
      return res.status(400).json({ message: "Missing required quiz data" });
    }

    // 🔹 3. Safely parse questions (for form-data)
    let parsedQuestions = questions;
    if (typeof questions === "string") {
      parsedQuestions = JSON.parse(questions);
    }

    // 🔹 4. Merge date + time
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    // 🔹 5. Handle question images upload
    if (req.files && req.files.length > 0) {
      let fileMap = {};

      req.files.forEach((file) => {
        if (!fileMap[file.fieldname]) fileMap[file.fieldname] = [];
        fileMap[file.fieldname].push(file);
      });

      for (let i = 0; i < parsedQuestions.length; i++) {
        const key = `questionImages_${i}`;
        const imageFiles = fileMap[key] || [];
        const urls = [];

        for (let file of imageFiles) {
          const uploaded = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            }).end(file.buffer);
          });

          urls.push(uploaded.secure_url);
        }

        parsedQuestions[i].imageUrl = urls;
      }
    }

    // 🔹 6. Create Quiz
    const newQuiz = new Quiz({
      title: quizTitle,
      subject,
      description,
      department,
      course: selectedCourses || [],
      yr: selectedYears || [],
      group: selectedGroups || [],
      questions: parsedQuestions,
      passingMarks,
      totalMarks,
      startTime: startDateTime,
      endTime: endDateTime,
      durationMinutes,
      createdBy: req.user._id,
    });

    await newQuiz.save();

    // 🔹 7. Attach quiz to faculty
    const faculty = await Faculty.findById(req.user._id);
    if (faculty) {
      faculty.createdQuizzes.push(newQuiz._id);
      await faculty.save();
    }

    // 🔹 8. Attach quiz to superAdmin safely
    const superAdminData = await superAdmin.findOne({ department });
    if (superAdminData) {
      superAdminData.departmentQuizzes.push(newQuiz._id);
      await superAdminData.save();
    }

    // 🔹 9. Find students
    let students = [];

    const isGlobalQuiz =
      (!selectedCourses || selectedCourses.length === 0) &&
      (!selectedYears || selectedYears.length === 0) &&
      (!selectedGroups || selectedGroups.length === 0);

    if (isGlobalQuiz) {
      students = await Student.find();
    } else {
      const query = {
        course: { $in: selectedCourses },
        yr: { $in: selectedYears },
      };

      if (selectedGroups && selectedGroups.length > 0) {
        query.group = { $in: selectedGroups };
      }

      students = await Student.find(query);
    }

    // 🔹 10. Send email notifications
    const emails = students.map((s) => s.email);

    if (emails.length > 0) {
      await sendEmail(
        emails,
        "New Quiz Available",
        `
        <h2>New Quiz: ${quizTitle}</h2>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>${description}</p>
        <p><strong>Start:</strong> ${startDateTime.toLocaleString()}</p>
        <p><strong>End:</strong> ${endDateTime.toLocaleString()}</p>
        <p><strong>Duration:</strong> ${durationMinutes} minutes</p>
        `
      );
    }

    // 🔹 11. Faculty activity log
    // await createFacultyActivity({
    //   facultyId: req.user._id,
    //   action: "QUIZ_CREATED",
    //   message: `Created quiz "${quizTitle}"`,
    //   performedBy: req.user.name,
    // });

    // 🔹 12. Success response
    res.status(201).json({
      message: "Quiz created successfully",
      quiz: newQuiz,
    });

  } catch (error) {
    console.error("CREATE QUIZ ERROR:", error);
    res.status(500).json({
      message: "Error creating quiz",
      error: error.message,
    });
  }
},

    getAllQuizzes: async (req, res) => {
        try {
            const quizzes = await Quiz.find();
            res.status(200).json(quizzes);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
        }
    },
    getQuizById: async (req, res) => {
        try {
            const { quizId } = req.params;
            const foundQuiz = await Quiz.findById(quizId);
            if (!foundQuiz) {
                return res.status(404).json({ message: 'Quiz not found' });
            }
            res.status(200).json(foundQuiz);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching quiz', error: error.message });
        }
    },

    updateQuizById: async (req, res) => {
        try {
            const { quizId } = req.params;
            const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, req.body, { new: true });
            if (!updatedQuiz) {
                return res.status(404).json({ message: 'Quiz not found' });


            }
             await createFacultyActivity({
        facultyId: req.user._id,
        action: "QUIZ_UPDATED",
        message: `Updated quiz "${updatedQuiz.title}"`,
        performedBy: req.user.name
      });
            res.status(200).json({ message: 'Quiz updated successfully', quiz: updatedQuiz });
        } catch (error) {
            res.status(500).json({ message: 'Error updating quiz', error: error.message });
        }


        await createFacultyActivity({
  facultyId: req.user._id,
  action: "QUIZ_UPDATED",
  message: `Updated quiz "${quiz.title}"`,
  performedBy: req.user.name
});

    },

    deleteQuizById: async (req, res) => {
        try {
            const { quizId } = req.params;
            const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
            if (!deletedQuiz) {
                return res.status(404).json({ message: 'Quiz not found' });

            }
                await createFacultyActivity({
        facultyId: req.user._id,
        action: "QUIZ_DELETED",
        message: `Deleted quiz "${deletedQuiz.title}"`,
        performedBy: req.user.name

      });
            
            res.status(200).json({ message: 'Quiz deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting quiz', error: error.message });
        }
        await createFacultyActivity({
  facultyId: req.user._id,
  action: "QUIZ_DELETED",
  message: `Deleted quiz "${quiz.title}"`,
  performedBy: req.user.name
});

    },

    registerStudentForQuiz: async (req, res) => {
        try {
            const { quizId } = req.params;
            const studentId = req.user._id;
            const quizToUpdate = await Quiz.findById(quizId);
            if (!quizToUpdate) {
                return res.status(404).json({ message: 'Quiz not found' });
            }
            if (quizToUpdate.registeredStudents.includes(studentId)) {
                return res.status(400).json({ message: 'Student already registered for this quiz' });
            }
            quizToUpdate.registeredStudents.push(studentId);
            await quizToUpdate.save();
            res.status(200).json({ message: 'Student registered for quiz successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error registering student for quiz', error: error.message });
        }
    },

    getQuizzesByDepartment: async (req, res) => {
        try {
            const { departmentName } = req.params;
            const quizzes = await Quiz.find({ department: departmentName });
            res.status(200).json(quizzes);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching quizzes by department', error: error.message });
        }
    },
    QuizAttempt: async (req, res) => {
    try {
      const { quizId } = req.params;
      const studentId = req.user.id;

      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      if (!quiz.registeredStudents.includes(studentId)) {
        return res.status(403).json({
          message: "Student not registered for this quiz",
        });
      }

      const now = Date.now();
      if (now < quiz.startTime.getTime() || now > quiz.endTime.getTime()) {
        return res.status(403).json({
          message: "Quiz not active currently",
        });
      }

      console.log("creating attempt:",quizId,studentId);

      const existingAttempt = await QuizAttempt.findOne({
        quizId,
        student: studentId,
      });

      if (existingAttempt) {
        return res.status(403).json({
          message: "Quiz already attempted",
        }); 
      }

      await QuizAttempt.create({
        quizId,
        student: studentId,
        status: "in_progress",
      });

   const shuffledQuestions = shuffleArray(quiz.questions);

    res.status(200).json({
      message: "Quiz attempt started",
      quiz: {
        ...quiz.toObject(),
        questions: shuffledQuestions,
      },
    });
    
    } catch (error) {
      res.status(500).json({
        message: "Error starting quiz",
        error: error.message,
      });
    }
  },

submitQuiz: async (req, res) => {
  try {
    const { quizId } = req.params;
    const studentId = req.user.id;
    const { answers, timeTaken } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const attempt = await QuizAttempt.findOne({
      quizId,
      student: studentId,
    });

    console.log("Type of quizId:",typeof quizId);
console.log("Find",attempt);

    if (!attempt || attempt.status !== "in_progress") {
      return res.status(403).json({
        message: "Invalid or already submitted attempt",
      });
    }

    let correctCount = 0;
    let wrongCount = 0;
    let scoredMarks = 0;

    quiz.questions.forEach((question) => {
      const studentAnswer = answers.find(
        (ans) => ans.questionId === question._id.toString()
      );

      if (studentAnswer) {
        if (studentAnswer.selectedOption === question.correctAnswer) {
          correctCount++;
          scoredMarks += question.marks;
        } else {
          wrongCount++;
          scoredMarks -= question.negativeMarks || 0;
        }
      }
    });


    // update attempt
    attempt.answers = answers;
    attempt.correctCount = correctCount;
    attempt.wrongCount = wrongCount;
    attempt.scoredMarks = scoredMarks;
    attempt.timeTaken = timeTaken;
    attempt.status = "submitted";
    await attempt.save();

    // save leaderboard entry
    await Leaderboard.create({
      quizId,
      userId: studentId,
      score: scoredMarks,
      timeTaken,
    });

    // 🔥 FETCH UPDATED LEADERBOARD
    const updatedLeaderboard = await Leaderboard.find({ quizId })
      .populate("userId", "name")
      .sort({ score: -1, timeTaken: 1 });

    // 🔥 LIVE EMIT TO QUIZ ROOM
  const io = getIo();
  if (io) {
  io.to(quizId).emit(
    "leaderboardUpdate",
    updatedLeaderboard
  );
} else {
  console.log("Socket io not available, skipping emit");
}

    res.status(200).json({
      message: "Quiz submitted successfully",
      score: scoredMarks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting quiz",
      error: error.message,
    });
  }
},
    getAttemptedQuizByStudent: async (req, res) => {
        try {
            const studentId = req.user.id;
            const {quizId} = req.params;
            console.log("Quiz ID:", quizId);
            const attemptedQuiz = await QuizAttempt.findOne({ student: studentId, quizId: quizId }).populate('quizId', 'title subject questions leaderboard');
            console.log("Attempted Quiz:", attemptedQuiz);
            res.status(200).json(attemptedQuiz);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching attempted quizzes', error: error.message });
        }   
    },
    getAllAttemptedQuizzes: async (req, res) => {
  try {
    console.log("Fetching all attempted quizzes");
    const studentId = req.user.id;

    const attemptedQuizzes = await QuizAttempt.find({
      student: studentId,
    })
      .populate("quizId", "title subject questions leaderboard")
      .sort({ attemptedAt: -1 }); // ✅ mongoose-level sort

    res.status(200).json(attemptedQuizzes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching attempted quizzes",
      error: error.message,
    });
  }
},

  generateCertificate: async (req, res) => {
  try {
    const data = req.body;
    const filePath = await generateCertificatePDF(data);
     const certificateUrl = await uploadCertificateToCloudinary(
                    filePath,
                    `certificate_${data.studentId}`
                );

    res.status(200).json({
      success: true,
      message: "Certificate generated successfully",
     certificateUrl: certificateUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating certificate",
      error: error.message,
    });
  }
},
startTimer: async (req, res) => {
    try {
        const { quizId } = req.params;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
         const io = getIo();
         if (io) {
           io.to(quizId).emit("quiz-started", {
    quizId,
    startingTimer: quiz.startingTimer,
  });
         }
        res.status(200).json({ startingTimer: quiz.startingTimer });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching starting timer', error: error.message });
    }
},
startQuizTimer:async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.isStarted) {
      return res.status(400).json({ message: "Quiz already started" });
    }

    quiz.quizStartTime = new Date();          
    quiz.isStarted = true;

    await quiz.save();

    const io = getIo();
    if (io) {
      io.to(`timer_${quizId}`).emit("quiz-started", {
      quizId,
      startTime: quiz.quizStartTime,
      duration: quiz.durationSeconds,
    });
    } else {
      console.log("Socket io not available");
    }

    res.status(200).json({
      message: "Quiz timer started",
      startTime: quiz.quizStartTime,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error starting quiz",
      error: error.message,
    });
  }
},

getQuizTimer:async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);

    if (!quiz || !quiz.isStarted) {
      return res.status(400).json({ message: "Quiz not started yet" });
    }

    res.status(200).json({
      startTime: quiz.quizStartTime,
      duration: quiz.durationSeconds,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching timer",
      error: error.message,
    });
  }
},
QuizRegisteredStudents:async(req,res)=>{
    const {quizId} = req.params;
    const quiz = await Quiz.findById(quizId);
   if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const registerStu = quiz.registeredStudents;
    res.status(200).json({
        message:"Registered Students",
        registeredStudent:registerStu,
    })
},
getStudentsRegisteredQuizzes:async(req,res)=>{
    try {
         const studentId = req.user._id;
         const registeredQuizzes = await Quiz.find({ registeredStudents: studentId });
        res.status(200).json(registeredQuizzes);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching registered quizzes", error: error.message });
    }
},
};

module.exports = QuizCtrl;
