const Quiz = require('../models/quizModel');
const Student = require('../models/studentModel');
const sendEmail = require('../utils/sendEmail');
const Leaderboard = require('../models/leaderboardModel');
const QuizAttempt = require('../models/QuizAttemptModel');
const { io } = require('../server');
const cloudinary = require('../config/cloudinary');
const Faculty = require('../models/FacultyModel');
const superAdmin = require('../models/superAdminModel');
const generateCertificatePDF = require('../utils/generateCertificatePDF');
const uploadCertificateToCloudinary = require('../utils/uploadCertificate');

//  update
// req.user.id t->req.user._id


const QuizCtrl = {
    createQuiz: async (req, res) => {
        try {
            const { title, subject, course, yr, group, description, department, questions, passingMarks, totalMarks, startTime, endTime, durationMinutes } = req.body;
           let parsedQuestions = questions;
      if (typeof questions === "string") {
        parsedQuestions = JSON.parse(questions);
      }
            if(req.files && req.files.length > 0){
            let fileMap = {};
            req.files.forEach((file) => {
                if (!fileMap[file.fieldname]) fileMap[file.fieldname] = [];
                fileMap[file.fieldname].push(file);
            });
            for (let i = 0; i < parsedQuestions.length; i++) {
                let key = `questionImages_${i}`;
                let imageFiles = fileMap[key] || [];
                let urls = [];
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
            const newQuiz = new Quiz({
                title,
                subject,
                course,
                yr,
                group,
                description,
                department,
                questions: parsedQuestions,
                passingMarks,
                totalMarks,
                startTime,
                endTime,
                durationMinutes,
                createdBy:req.user._id,
            });
            await newQuiz.save(); 
            
            const facultyId = req.user._id;
            const newFacultyQuiz = await Faculty.findById(facultyId);
            newFacultyQuiz.createdQuizzes.push(newQuiz._id);
            await newFacultyQuiz.save();
            const superAdminData = await superAdmin.findOne({ department: department });
            superAdminData.departmentQuizzes.push(newQuiz._id);
            await superAdminData.save();
            let students;
            if (!course && !yr && !group) {
                students = await Student.find();
                const emails = students.map(s => s.email);
                await sendEmail(
                    emails,
                    'New Quiz Available',
                    `<h2>A new quiz titled "${title}" is available</h2>
  <h2>subject: "${subject}"</h2>
   <p>Description: ${description}</p>
   <p>Start Time: ${new Date(startTime).toLocaleString()}</p>
   <p>End Time: ${new Date(endTime).toLocaleString()}</p> 
    <p>Duration: ${durationMinutes} minutes</p>
    `);
            }
            else{
                const query = {
                    course: { $in: course },
                    yr: { $in: yr },
                };
                if (group && group.length > 0) {
                    query.group = { $in: group };
                }
                 students = await Student.find(query);
                const emails = students.map(s => s.email);
                await sendEmail(
                    emails,
                    'New Quiz Available',
                    `<h2>A new quiz titled "${title}" is available</h2>
  <h2>subject: "${subject}"</h2>
   <p>Description: ${description}</p>
   <p>Start Time: ${new Date(startTime).toLocaleString()}</p>
   <p>End Time: ${new Date(endTime).toLocaleString()}</p> 
    <p>Duration: ${durationMinutes} minutes</p>
    `);
            }
         res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
        } catch (error) {
            res.status(500).json({ message: 'Error creating quiz', error: error.message });
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

     getFacultyQuizzes: async (req, res) => {
        try {
            const quizzes = await Quiz.find({ createdBy: req.user._id }); // ✅ CHANGED
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
            res.status(200).json({ message: 'Quiz updated successfully', quiz: updatedQuiz });
        } catch (error) {
            res.status(500).json({ message: 'Error updating quiz', error: error.message });
        }
    },

    deleteQuizById: async (req, res) => {
        try {
            const { quizId } = req.params;
            const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
            if (!deletedQuiz) {
                return res.status(404).json({ message: 'Quiz not found' });
            }
            res.status(200).json({ message: 'Quiz deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting quiz', error: error.message });
        }
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
            const studentId = req.user._id;
            const quiz = await Quiz.findById(quizId);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz not found' });
            }
            const registered = quiz.registeredStudents.includes(studentId);
            if (!registered) {
                return res.status(403).json({ message: 'Student not registered for this quiz' });
            }
            const now = Date.now();
            if (now < quiz.startTime || now > quiz.endTime) {
                return res.status(403).json({ message: 'Quiz not active currently' });
            }
            res.status(200).json(quiz);
        } catch (error) {
            res.status(500).json({ message: 'Error attempting quiz', error: error.message });
        }
    },
   submitQuiz: async (req, res) => {
    try {
        const { quizId } = req.params;
        const studentId = req.user._id;
        const { answers, timeTaken } = req.body;

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        let correctCount = 0;
        let wrongCount = 0;
        let scoredMarks = 0;

        quiz.questions.forEach((question) => {
            const studentAnswer = answers.find(
                ans => ans.questionId === question._id.toString()
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

        await QuizAttempt.create({
            quizId,
            student: studentId,
            answers,
            correctCount,
            wrongCount,
            scoredMarks,
            timeTaken
        });

        await Leaderboard.create({
            quizId,
            userId: studentId,
            score: scoredMarks,
            timeTaken
        });

        const updatedLeaderboard = await Leaderboard.find({ quizId })
            .populate('userId', 'name')
            .sort({
                score: -1,    
                timeTaken: 1   
            });

        io.to(quizId.toString()).emit('leaderboardUpdate', updatedLeaderboard);

        return res.status(200).json({
            message: 'Quiz submitted successfully',
            score: scoredMarks
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error submitting quiz',
            error: error.message
        });
    }
},

    getAttemptedQuizByStudent: async (req, res) => {
        try {
            const studentId = req.user._id;
            const {quizId} = req.params;
            const attemptedQuiz = await QuizAttempt.find({ student: studentId, quizId: quizId }).populate('quizId', 'title subject questions leaderboard');
            res.status(200).json(attemptedQuiz);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching attempted quizzes', error: error.message });
        }   
    },
    getAllAttemptedQuizzes: async (req, res) => {
        try{
            const studentId =req.user._id;
            const attemptedQuizzes = (await QuizAttempt.find({student:studentId}).populate('quizId', 'title subject questions leaderboard')).sort({attemptedAt: -1});
            res.status(200).json(attemptedQuizzes);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching attempted quizzes', error: error.message });
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
         io.to(quizId).emit("quiz-started", {
    quizId,
    startingTimer: quiz.startingTimer,
  });
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
    quiz.durationSeconds = quiz.durationMinutes * 60;
    quiz.isStarted = true;

    await quiz.save();

    io.to(`timer_${quizId}`).emit("quiz-started", {
      quizId,
      startTime: quiz.quizStartTime,
      duration: quiz.durationSeconds,
    });

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
}
};

module.exports = QuizCtrl;
