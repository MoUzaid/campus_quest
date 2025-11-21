const Quiz = require('../models/quizModel');
const Student = require('../models/studentModel');
const sendEmail = require('../utils/sendEmail');
const Leaderboard = require('../models/leaderboardModel');
const QuizAttempt = require('../models/attemptedQuiz');

const QuizCtrl = {
    createQuiz: async (req, res) => {
        try {
            const { title, subject, course, yr, group, description, department, questions, totalMarks, startTime, endTime, durationMinutes } = req.body;
            department.toUpperCase();
            const newQuiz = new Quiz({
                title,
                subject,
                course,
                yr,
                group,
                description,
                department,
                questions,
                totalMarks,
                startTime,
                endTime,
                durationMinutes
            });
            await newQuiz.save();
            const students = await Student.find({
                course: { $in: course },
                yr: { $in: yr },
                group: { $in: group }
            });
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
            const { studentId } = req.user.id;
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
    submitQuiz: async (req, res) => {
        try {
            const { quizId } = req.params;
            const studentId = req.user.id;
            const { answers, timeTaken } = req.body;
            const quizToAttempt = await Quiz.findById(quizId);
            if (!quizToAttempt) {
                return res.status(404).json({ message: 'Quiz not found' });
            }
            let correctCount = 0;
            let wrongCount = 0;
            let totalMarksObtained = 0;

            quizToAttempt.questions.forEach((question) => {
                const studentAnswer = answers.find(
                    ans => ans.questionId === question._id.toString()
                );

                if (studentAnswer) {
                    if (studentAnswer.selectedOption === question.correctAnswer) {
                        correctCount++;
                        totalMarksObtained += question.marks;
                    } else {
                        wrongCount++;
                        totalMarksObtained -= question.negativeMarks;
                    }
                }
            });
            const savedAttempt = await QuizAttempt.create({
                quiz: quizId,
                student: studentId,
                answers: answers,
                correctCount: correctCount,
                wrongCount: wrongCount,
                totalMarks: totalMarksObtained,
                timeTaken: timeTaken,
            });
            const leaderboard = await Leaderboard.create(
                { quizId:quizId, userId:studentId },
                { score:totalMarksObtained, timeTaken:timeTaken },
            );
            await leaderboard.save();
            return res.status(200).json({
                message: "Quiz submitted successfully",
                correctCount,
                wrongCount,
                totalMarksObtained,
                attemptId: savedAttempt._id
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error submitting quiz',
                error: error.message
            });
        }
    }
};

module.exports = QuizCtrl;