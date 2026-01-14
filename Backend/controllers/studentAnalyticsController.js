const Student = require('../models/studentModel');
const Quiz = require('../models/quizModel');
const QuizAttempt = require('../models/QuizAttemptModel');

// @desc    Get comprehensive analytics for a student
// @route   GET /api/student-analytics/:studentId
// @access  Private (Student access to own data only)
// const getStudentAnalytics = async (req, res) => {
//     try {
//         const { studentId } = req.params;
        
//         // Verify student exists
//         const student = await Student.findById(studentId);
//         if (!student) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Student not found'
//             });
//         }

//         // Get all quizzes where student is registered
//         const registeredQuizzes = await Quiz.find({
//             registeredStudents: studentId,
//             startTime: { $lte: new Date() } // Only quizzes that have started
//         }).select('_id title subject department course passingMarks totalMarks startTime endTime');

//         // Get all quiz attempts by this student
//         const quizAttempts = await QuizAttempt.find({ student: studentId })
//             .populate('quizId', 'title subject department course totalMarks passingMarks')
//             .sort({ attemptedAt: -1 });

//         // Calculate basic statistics
//         const totalRegistered = registeredQuizzes.length;
//         const totalAttempted = quizAttempts.length;
        
//         // Group attempts by quiz to get best scores
//         const attemptsByQuiz = {};
//         quizAttempts.forEach(attempt => {
//             const quizId = attempt.quizId._id.toString();
//             if (!attemptsByQuiz[quizId]) {
//                 attemptsByQuiz[quizId] = {
//                     quizDetails: attempt.quizId,
//                     attempts: [],
//                     bestScore: 0,
//                     latestScore: 0,
//                     attemptCount: 0
//                 };
//             }
//             attemptsByQuiz[quizId].attempts.push(attempt);
//             attemptsByQuiz[quizId].attemptCount++;
            
//             // Update best score
//             if (attempt.scoredMarks > attemptsByQuiz[quizId].bestScore) {
//                 attemptsByQuiz[quizId].bestScore = attempt.scoredMarks;
//             }
            
//             // Track latest score (attempts are sorted desc by date)
//             if (!attemptsByQuiz[quizId].latestScore) {
//                 attemptsByQuiz[quizId].latestScore = attempt.scoredMarks;
//             }
//         });

//         // Calculate overall statistics
//         let totalMarksPossible = 0;
//         let totalMarksObtained = 0;
//         let highestScore = 0;
//         let lowestScore = Infinity;
//         let totalTimeTaken = 0;
//         const subjectPerformance = {};
//         const departmentPerformance = {};
        
//         quizAttempts.forEach(attempt => {
//             const quiz = attempt.quizId;
//             const scoredMarks = attempt.scoredMarks;
            
//             // Overall marks
//             totalMarksPossible += quiz.totalMarks;
//             totalMarksObtained += scoredMarks;
            
//             // Highest/Lowest scores
//             highestScore = Math.max(highestScore, scoredMarks);
//             if (scoredMarks < lowestScore) {
//                 lowestScore = scoredMarks;
//             }
            
//             // Time tracking
//             totalTimeTaken += attempt.timeTaken;
            
//             // Subject-wise performance
//             if (!subjectPerformance[quiz.subject]) {
//                 subjectPerformance[quiz.subject] = {
//                     totalAttempts: 0,
//                     totalMarksObtained: 0,
//                     totalMarksPossible: 0,
//                     quizzes: []
//                 };
//             }
//             subjectPerformance[quiz.subject].totalAttempts++;
//             subjectPerformance[quiz.subject].totalMarksObtained += scoredMarks;
//             subjectPerformance[quiz.subject].totalMarksPossible += quiz.totalMarks;
//             subjectPerformance[quiz.subject].quizzes.push({
//                 quizId: quiz._id,
//                 title: quiz.title,
//                 score: scoredMarks,
//                 totalMarks: quiz.totalMarks,
//                 percentage: (scoredMarks / quiz.totalMarks) * 100
//             });
            
//             // Department-wise performance
//             if (!departmentPerformance[quiz.department]) {
//                 departmentPerformance[quiz.department] = {
//                     totalAttempts: 0,
//                     totalMarksObtained: 0,
//                     totalMarksPossible: 0
//                 };
//             }
//             departmentPerformance[quiz.department].totalAttempts++;
//             departmentPerformance[quiz.department].totalMarksObtained += scoredMarks;
//             departmentPerformance[quiz.department].totalMarksPossible += quiz.totalMarks;
//         });

//         // Calculate averages
//         const averageScore = totalAttempted > 0 ? (totalMarksObtained / totalAttempted) : 0;
//         const overallPercentage = totalMarksPossible > 0 ? (totalMarksObtained / totalMarksPossible) * 100 : 0;
//         const averageTimePerQuiz = totalAttempted > 0 ? totalTimeTaken / totalAttempted : 0;
        
//         // Calculate pass/fail statistics
//         const passedQuizzes = quizAttempts.filter(attempt => {
//             const quiz = attempt.quizId;
//             const passPercentage = (quiz.passingMarks / quiz.totalMarks) * 100;
//             const studentPercentage = (attempt.scoredMarks / quiz.totalMarks) * 100;
//             return studentPercentage >= passPercentage;
//         }).length;

//         const failedQuizzes = totalAttempted - passedQuizzes;

//         // Prepare response data
//         const response = {
//             studentInfo: {
//                 _id: student._id,
//                 name: student.name,
//                 enrollmentNumber: student.enrollmentNumber,
//                 department: student.department,
//                 course: student.course,
//                 semester: student.semester
//             },
//             summary: {
//                 totalRegisteredQuizzes: totalRegistered,
//                 totalAttemptedQuizzes: totalAttempted,
//                 attemptedRatio: totalRegistered > 0 ? ((totalAttempted / totalRegistered) * 100).toFixed(2) + '%' : '0%',
//                 participationRate: totalRegistered > 0 ? ((totalAttempted / totalRegistered) * 100) : 0,
//                 averageQuizAttempts: totalRegistered > 0 ? (totalAttempted / totalRegistered).toFixed(2) : 0,
//                 averageScore: averageScore.toFixed(2),
//                 overallPercentage: overallPercentage.toFixed(2) + '%',
//                 highestScore,
//                 lowestScore: lowestScore === Infinity ? 0 : lowestScore,
//                 averageTimePerQuiz: formatTime(averageTimePerQuiz),
//                 totalTimeSpent: formatTime(totalTimeTaken),
//                 passedQuizzes,
//                 failedQuizzes,
//                 passPercentage: totalAttempted > 0 ? ((passedQuizzes / totalAttempted) * 100).toFixed(2) + '%' : '0%'
//             },
//             performanceTrend: {
//                 // Last 5 attempts trend
//                 recentPerformance: quizAttempts.slice(0, 5).map(attempt => ({
//                     quizTitle: attempt.quizId.title,
//                     score: attempt.scoredMarks,
//                     totalMarks: attempt.quizId.totalMarks,
//                     // percentage: (attempt.scoredMarks / attempt.quizId.totalMarks) * 100,
//                      percentage: Math.min((attempt.scoredMarks / attempt.quizId.totalMarks) * 100, 100),
//                     date: attempt.attemptedAt
//                 })),
//                 // Performance over time (group by month)
//                 monthlyPerformance: getMonthlyPerformance(quizAttempts)
//             },
//             subjectWiseAnalysis: Object.entries(subjectPerformance).map(([subject, data]) => ({
//                 subject,
//                 totalAttempts: data.totalAttempts,
//                 averageScore: (data.totalMarksObtained / data.totalAttempts).toFixed(2),
//                 subjectPercentage: ((data.totalMarksObtained / data.totalMarksPossible) * 100).toFixed(2) + '%',
//                 quizzes: data.quizzes.slice(0, 3) // Show top 3 quizzes per subject
//             })),
//             departmentWiseAnalysis: Object.entries(departmentPerformance).map(([dept, data]) => ({
//                 department: dept,
//                 totalAttempts: data.totalAttempts,
//                 departmentPercentage: ((data.totalMarksObtained / data.totalMarksPossible) * 100).toFixed(2) + '%',
//                 averageScore: (data.totalMarksObtained / data.totalAttempts).toFixed(2)
//             })),
//             quizWiseDetails: Object.values(attemptsByQuiz).map(quizData => ({
//                 quizId: quizData.quizDetails._id,
//                 title: quizData.quizDetails.title,
//                 subject: quizData.quizDetails.subject,
//                 totalMarks: quizData.quizDetails.totalMarks,
//                 passingMarks: quizData.quizDetails.passingMarks,
//                 attempts: quizData.attemptCount,
//                 bestScore: quizData.bestScore,
//                 latestScore: quizData.latestScore,
//                 percentage: (quizData.latestScore / quizData.quizDetails.totalMarks) * 100,
//                 isPassed: quizData.latestScore >= quizData.quizDetails.passingMarks,
//                 latestAttemptDate: quizData.attempts[0].attemptedAt
//             })),
//             improvementAreas: identifyImprovementAreas(subjectPerformance, quizAttempts),
//             recommendations: generateRecommendations(
//                 totalRegistered,
//                 totalAttempted,
//                 overallPercentage,
//                 subjectPerformance
//             )
//         };

//         res.status(200).json({
//             success: true,
//             data: response,
//             message: 'Student analytics fetched successfully'
//         });

//     } catch (error) {
//         console.error('Error fetching student analytics:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching analytics',
//             error: error.message
//         });
//     }
// };

// // Helper function to format time
// const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = Math.floor(seconds % 60);
    
//     if (hours > 0) {
//         return `${hours}h ${minutes}m ${secs}s`;
//     } else if (minutes > 0) {
//         return `${minutes}m ${secs}s`;
//     } else {
//         return `${secs}s`;
//     }
// };

// // Helper function to calculate monthly performance
// const getMonthlyPerformance = (quizAttempts) => {
//     const monthlyData = {};
    
//     quizAttempts.forEach(attempt => {
//         const date = new Date(attempt.attemptedAt);
//         const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
//         if (!monthlyData[monthYear]) {
//             monthlyData[monthYear] = {
//                 totalAttempts: 0,
//                 totalScore: 0,
//                 totalPossible: 0,
//                 quizzes: []
//             };
//         }
        
//         monthlyData[monthYear].totalAttempts++;
//         monthlyData[monthYear].totalScore += attempt.scoredMarks;
//         monthlyData[monthYear].totalPossible += attempt.quizId.totalMarks;
//         monthlyData[monthYear].quizzes.push(attempt.quizId.title);
//     });
    
//     return Object.entries(monthlyData).map(([month, data]) => ({
//         month,
//         averagePercentage: ((data.totalScore / data.totalPossible) * 100).toFixed(2) + '%',
//         totalAttempts: data.totalAttempts,
//         averageScore: (data.totalScore / data.totalAttempts).toFixed(2),
//         uniqueQuizzes: [...new Set(data.quizzes)].length
//     }));
// };

// // Helper function to identify improvement areas
// const identifyImprovementAreas = (subjectPerformance, quizAttempts) => {
//     const areas = [];
    
//     // Find subjects with lowest performance
//     const subjectPercentages = Object.entries(subjectPerformance).map(([subject, data]) => ({
//         subject,
//         percentage: (data.totalMarksObtained / data.totalMarksPossible) * 100
//     }));
    
//     subjectPercentages.sort((a, b) => a.percentage - b.percentage);
    
//     // Get bottom 2 subjects for improvement
//     const lowPerformingSubjects = subjectPercentages.slice(0, 2);
//     lowPerformingSubjects.forEach(subject => {
//         if (subject.percentage < 60) { // Threshold for improvement
//             areas.push({
//                 area: subject.subject,
//                 currentPercentage: subject.percentage.toFixed(2) + '%',
//                 recommendation: `Focus on ${subject.subject} concepts. Practice more quizzes in this subject.`
//             });
//         }
//     });
    
//     // Check time management
//     const recentAttempts = quizAttempts.slice(0, 5);
//     const timePerQuestion = recentAttempts.map(attempt => {
//         const totalQuestions = attempt.answers.length;
//         return attempt.timeTaken / totalQuestions;
//     });
    
//     const avgTimePerQuestion = timePerQuestion.reduce((a, b) => a + b, 0) / timePerQuestion.length;
    
//     if (avgTimePerQuestion > 60) { // If more than 60 seconds per question
//         areas.push({
//             area: 'Time Management',
//             currentAverage: avgTimePerQuestion.toFixed(2) + 's per question',
//             recommendation: 'Practice time-bound quizzes to improve speed'
//         });
//     }
    
//     return areas;
// };

// // Helper function to generate recommendations
// const generateRecommendations = (totalRegistered, totalAttempted, overallPercentage, subjectPerformance) => {
//     const recommendations = [];
    
//     // Participation recommendation
//     const participationRate = (totalAttempted / totalRegistered) * 100;
//     if (participationRate < 80) {
//         recommendations.push({
//             type: 'Participation',
//             message: `You have attempted ${totalAttempted} out of ${totalRegistered} registered quizzes. Try to attempt more quizzes to improve your performance.`,
//             priority: 'High'
//         });
//     }
    
//     // Performance recommendation
//     if (overallPercentage < 60) {
//         recommendations.push({
//             type: 'Performance',
//             message: `Your overall score is ${overallPercentage.toFixed(2)}%. Aim for at least 70% in upcoming quizzes.`,
//             priority: 'High'
//         });
//     } else if (overallPercentage < 80) {
//         recommendations.push({
//             type: 'Performance',
//             message: `Great job! Your score is ${overallPercentage.toFixed(2)}%. Try to achieve 85%+ in future attempts.`,
//             priority: 'Medium'
//         });
//     } else {
//         recommendations.push({
//             type: 'Performance',
//             message: `Excellent performance! Maintain your consistency of ${overallPercentage.toFixed(2)}%.`,
//             priority: 'Low'
//         });
//     }
    
//     // Subject-wise recommendations
//     Object.entries(subjectPerformance).forEach(([subject, data]) => {
//         const subjectPercentage = (data.totalMarksObtained / data.totalMarksPossible) * 100;
//         if (subjectPercentage < 60) {
//             recommendations.push({
//                 type: 'Subject Focus',
//                 message: `${subject}: Score ${subjectPercentage.toFixed(2)}%. Needs improvement. Review core concepts.`,
//                 priority: 'High'
//             });
//         }
//     });
    
//     return recommendations;
// };

// // @desc    Get detailed quiz history for a student
// // @route   GET /api/student-analytics/:studentId/quiz-history
// // @access  Private
// const getQuizHistory = async (req, res) => {
//     try {
//         const { studentId } = req.params;
//         const { page = 1, limit = 10, subject, sortBy = 'date', order = 'desc' } = req.query;
        
//         // Build query
//         const query = { student: studentId };
        
//         // If subject filter is provided
//         if (subject) {
//             const quizzes = await Quiz.find({ subject }).select('_id');
//             const quizIds = quizzes.map(q => q._id);
//             query.quizId = { $in: quizIds };
//         }
        
//         // Calculate skip for pagination
//         const skip = (page - 1) * limit;
        
//         // Get total count
//         const total = await QuizAttempt.countDocuments(query);
        
//         // Determine sort order
//         let sort = {};
//         switch (sortBy) {
//             case 'score':
//                 sort = { scoredMarks: order === 'asc' ? 1 : -1 };
//                 break;
//             case 'date':
//                 sort = { attemptedAt: order === 'asc' ? 1 : -1 };
//                 break;
//             case 'time':
//                 sort = { timeTaken: order === 'asc' ? 1 : -1 };
//                 break;
//             default:
//                 sort = { attemptedAt: -1 };
//         }
        
//         // Get quiz attempts with pagination and populate
//         const quizAttempts = await QuizAttempt.find(query)
//             .populate('quizId', 'title subject department course totalMarks passingMarks startTime endTime')
//             .populate('student', 'name enrollmentNumber')
//             .sort(sort)
//             .skip(skip)
//             .limit(parseInt(limit));
        
//         // Format response
//         const attempts = quizAttempts.map(attempt => {
//             const quiz = attempt.quizId;
//             // const percentage = (attempt.scoredMarks / quiz.totalMarks) * 100;
//             const percentage = Math.min((attempt.scoredMarks / quiz.totalMarks) * 100, 100); // CHANGE HERE
//             const passPercentage = (quiz.passingMarks / quiz.totalMarks) * 100;
            
//             return {
//                 attemptId: attempt._id,
//                 quizId: quiz._id,
//                 quizTitle: quiz.title,
//                 subject: quiz.subject,
//                 department: quiz.department,
//                 course: quiz.course,
//                 score: attempt.scoredMarks,
//                 totalMarks: quiz.totalMarks,
//                 percentage: percentage.toFixed(2),
//                 isPassed: percentage >= passPercentage,
//                 correctCount: attempt.correctCount,
//                 wrongCount: attempt.wrongCount,
//                 timeTaken: formatTime(attempt.timeTaken),
//                 attemptedAt: attempt.attemptedAt,
//                 quizSchedule: {
//                     startTime: quiz.startTime,
//                     endTime: quiz.endTime
//                 }
//             };
//         });
        
//         res.status(200).json({
//             success: true,
//             data: {
//                 attempts,
//                 pagination: {
//                     currentPage: parseInt(page),
//                     totalPages: Math.ceil(total / limit),
//                     totalAttempts: total,
//                     hasNext: (page * limit) < total,
//                     hasPrevious: page > 1
//                 }
//             },
//             message: 'Quiz history fetched successfully'
//         });
        
//     } catch (error) {
//         console.error('Error fetching quiz history:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching quiz history',
//             error: error.message
//         });
//     }
// };

// // @desc    Get subject-wise detailed analysis
// // @route   GET /api/student-analytics/:studentId/subject-analysis
// // @access  Private
// const getSubjectAnalysis = async (req, res) => {
//     try {
//         const { studentId } = req.params;
        
//         // Get all attempts grouped by subject
//         const quizAttempts = await QuizAttempt.find({ student: studentId })
//             .populate('quizId', 'title subject totalMarks');
        
//         const subjectData = {};
        
//         quizAttempts.forEach(attempt => {
//             const subject = attempt.quizId.subject;
            
//             if (!subjectData[subject]) {
//                 subjectData[subject] = {
//                     totalAttempts: 0,
//                     totalCorrect: 0,
//                     totalWrong: 0,
//                     totalScore: 0,
//                     totalPossible: 0,
//                     quizzes: [],
//                     performanceTrend: []
//                 };
//             }
            
//             subjectData[subject].totalAttempts++;
//             subjectData[subject].totalCorrect += attempt.correctCount;
//             subjectData[subject].totalWrong += attempt.wrongCount;
//             subjectData[subject].totalScore += attempt.scoredMarks;
//             subjectData[subject].totalPossible += attempt.quizId.totalMarks;
            
//             subjectData[subject].quizzes.push({
//                 quizId: attempt.quizId._id,
//                 title: attempt.quizId.title,
//                 score: attempt.scoredMarks,
//                 totalMarks: attempt.quizId.totalMarks
//             });
            
//             subjectData[subject].performanceTrend.push({
//                 date: attempt.attemptedAt,
//                 score: attempt.scoredMarks,
//                 // percentage: (attempt.scoredMarks / attempt.quizId.totalMarks) * 100
//                 percentage: Math.min((attempt.scoredMarks / attempt.quizId.totalMarks) * 100, 100) // CHANGE HERE
//             });
//         });
        
//         // Calculate subject-wise statistics
//         const analysis = Object.entries(subjectData).map(([subject, data]) => {
//             const accuracy = data.totalCorrect + data.totalWrong > 0 
//                 ? (data.totalCorrect / (data.totalCorrect + data.totalWrong)) * 100 
//                 : 0;
            
//             const averageScore = data.totalAttempts > 0 
//                 ? data.totalScore / data.totalAttempts 
//                 : 0;
            
//             const subjectPercentage = data.totalPossible > 0 
//                 ? (data.totalScore / data.totalPossible) * 100 
//                 : 0;
            
//             // Sort performance trend by date
//             data.performanceTrend.sort((a, b) => new Date(a.date) - new Date(b.date));
            
//             // Calculate improvement
//             let improvement = 0;
//             if (data.performanceTrend.length >= 2) {
//                 const firstScore = data.performanceTrend[0].percentage;
//                 const lastScore = data.performanceTrend[data.performanceTrend.length - 1].percentage;
//                 improvement = lastScore - firstScore;
//             }
            
//             return {
//                 subject,
//                 totalAttempts: data.totalAttempts,
//                 accuracy: accuracy.toFixed(2) + '%',
//                 averageScore: averageScore.toFixed(2),
//                 subjectPercentage: subjectPercentage.toFixed(2) + '%',
//                 totalCorrect: data.totalCorrect,
//                 totalWrong: data.totalWrong,
//                 improvement: improvement.toFixed(2) + '%',
//                 performanceTrend: data.performanceTrend.map(trend => ({
//                     date: trend.date,
//                     score: trend.score,
//                     percentage: trend.percentage.toFixed(2)
//                 }))
//             };
//         });
        
//         // Sort by percentage (highest first)
//         analysis.sort((a, b) => {
//             const aPercent = parseFloat(a.subjectPercentage);
//             const bPercent = parseFloat(b.subjectPercentage);
//             return bPercent - aPercent;
//         });
        
//         res.status(200).json({
//             success: true,
//             data: analysis,
//             message: 'Subject analysis fetched successfully'
//         });
        
//     } catch (error) {
//         console.error('Error fetching subject analysis:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching subject analysis',
//             error: error.message
//         });
//     }
// };

// module.exports = {
//     getStudentAnalytics,
//     getQuizHistory,
//     getSubjectAnalysis
// };













// @desc    Get comprehensive analytics for a student
// @route   GET /api/student-analytics/:studentId
// @access  Private (Student access to own data only)
const getStudentAnalytics = async (req, res) => {
    try {
        const { studentId } = req.params;
        
        // Verify student exists
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        // Get all quizzes where student is registered
        const registeredQuizzes = await Quiz.find({
            registeredStudents: studentId,
            startTime: { $lte: new Date() } // Only quizzes that have started
        }).select('_id title subject department course passingMarks totalMarks startTime endTime');

        // Get all quiz attempts by this student
        const quizAttempts = await QuizAttempt.find({ student: studentId })
            .populate('quizId', 'title subject department course totalMarks passingMarks')
            .sort({ attemptedAt: -1 });

        // Calculate basic statistics
        const totalRegistered = registeredQuizzes.length;
        const totalAttempted = quizAttempts.length;
        
        // Group attempts by quiz to get best scores
        const attemptsByQuiz = {};
        quizAttempts.forEach(attempt => {
            const quizId = attempt.quizId._id.toString();
            if (!attemptsByQuiz[quizId]) {
                attemptsByQuiz[quizId] = {
                    quizDetails: attempt.quizId,
                    attempts: [],
                    bestScore: 0,
                    latestScore: 0,
                    attemptCount: 0
                };
            }
            attemptsByQuiz[quizId].attempts.push(attempt);
            attemptsByQuiz[quizId].attemptCount++;
            
            // Update best score
            if (attempt.scoredMarks > attemptsByQuiz[quizId].bestScore) {
                attemptsByQuiz[quizId].bestScore = attempt.scoredMarks;
            }
            
            // Track latest score (attempts are sorted desc by date)
            if (!attemptsByQuiz[quizId].latestScore) {
                attemptsByQuiz[quizId].latestScore = attempt.scoredMarks;
            }
        });

        // NEW: Calculate rank for each quiz
        // We'll calculate rank for each quiz where student has attempted
        const quizIdsWithAttempts = Object.keys(attemptsByQuiz);
        
        // Create a map to store ranks for each quiz
        const quizRanks = {};
        
        // Calculate rank for each quiz in parallel
        await Promise.all(
            quizIdsWithAttempts.map(async (quizId) => {
                try {
                    // Get all attempts for this quiz from all students
                    const allQuizAttempts = await QuizAttempt.find({ quizId })
                        .populate('student', '_id name')
                        .sort({ scoredMarks: -1, timeTaken: 1 }); // Sort by score desc, time asc
                    
                    // Group by student to get their best attempt
                    const studentBestAttempts = {};
                    allQuizAttempts.forEach(attempt => {
                        const studId = attempt.student._id.toString();
                        
                        if (!studentBestAttempts[studId]) {
                            studentBestAttempts[studId] = attempt;
                        } else {
                            const existing = studentBestAttempts[studId];
                            // Keep the better attempt (higher score or same score with less time)
                            if (attempt.scoredMarks > existing.scoredMarks) {
                                studentBestAttempts[studId] = attempt;
                            } else if (attempt.scoredMarks === existing.scoredMarks && 
                                      attempt.timeTaken < existing.timeTaken) {
                                studentBestAttempts[studId] = attempt;
                            }
                        }
                    });
                    
                    // Convert to array and sort again to be sure
                    const bestAttemptsArray = Object.values(studentBestAttempts)
                        .sort((a, b) => {
                            // Primary: score (descending)
                            if (b.scoredMarks !== a.scoredMarks) {
                                return b.scoredMarks - a.scoredMarks;
                            }
                            // Secondary: time (ascending)
                            return a.timeTaken - b.timeTaken;
                        });
                    
                    // Calculate ranks with tie handling
                    let currentRank = 1;
                    let previousScore = null;
                    let previousTime = null;
                    
                    for (let i = 0; i < bestAttemptsArray.length; i++) {
                        const attempt = bestAttemptsArray[i];
                        const currentScore = attempt.scoredMarks;
                        const currentTime = attempt.timeTaken;
                        
                        if (i === 0) {
                            // First student gets rank 1
                            attempt.rank = 1;
                            previousScore = currentScore;
                            previousTime = currentTime;
                        } else {
                            // Check if same score and same time as previous
                            if (currentScore === previousScore && currentTime === previousTime) {
                                // Same rank as previous
                                attempt.rank = currentRank;
                            } else {
                                // Different rank
                                currentRank = i + 1;
                                attempt.rank = currentRank;
                                previousScore = currentScore;
                                previousTime = currentTime;
                            }
                        }
                        
                        // If this is our target student, store their rank
                        if (attempt.student._id.toString() === studentId) {
                            quizRanks[quizId] = {
                                rank: attempt.rank,
                                totalParticipants: bestAttemptsArray.length
                            };
                        }
                    }
                    
                } catch (error) {
                    console.error(`Error calculating rank for quiz ${quizId}:`, error);
                    quizRanks[quizId] = null;
                }
            })
        );

        // Calculate overall statistics
        let totalMarksPossible = 0;
        let totalMarksObtained = 0;
        let highestScore = 0;
        let lowestScore = Infinity;
        let totalTimeTaken = 0;
        const subjectPerformance = {};
        const departmentPerformance = {};
        
        quizAttempts.forEach(attempt => {
            const quiz = attempt.quizId;
            const scoredMarks = attempt.scoredMarks;
            
            // Overall marks
            totalMarksPossible += quiz.totalMarks;
            totalMarksObtained += scoredMarks;
            
            // Highest/Lowest scores
            highestScore = Math.max(highestScore, scoredMarks);
            if (scoredMarks < lowestScore) {
                lowestScore = scoredMarks;
            }
            
            // Time tracking
            totalTimeTaken += attempt.timeTaken;
            
            // Subject-wise performance
            if (!subjectPerformance[quiz.subject]) {
                subjectPerformance[quiz.subject] = {
                    totalAttempts: 0,
                    totalMarksObtained: 0,
                    totalMarksPossible: 0,
                    quizzes: []
                };
            }
            subjectPerformance[quiz.subject].totalAttempts++;
            subjectPerformance[quiz.subject].totalMarksObtained += scoredMarks;
            subjectPerformance[quiz.subject].totalMarksPossible += quiz.totalMarks;
            subjectPerformance[quiz.subject].quizzes.push({
                quizId: quiz._id,
                title: quiz.title,
                score: scoredMarks,
                totalMarks: quiz.totalMarks,
                percentage: (scoredMarks / quiz.totalMarks) * 100
            });
            
            // Department-wise performance
            if (!departmentPerformance[quiz.department]) {
                departmentPerformance[quiz.department] = {
                    totalAttempts: 0,
                    totalMarksObtained: 0,
                    totalMarksPossible: 0
                };
            }
            departmentPerformance[quiz.department].totalAttempts++;
            departmentPerformance[quiz.department].totalMarksObtained += scoredMarks;
            departmentPerformance[quiz.department].totalMarksPossible += quiz.totalMarks;
        });

        // Calculate averages
        const averageScore = totalAttempted > 0 ? (totalMarksObtained / totalAttempted) : 0;
        const overallPercentage = totalMarksPossible > 0 ? (totalMarksObtained / totalMarksPossible) * 100 : 0;
        const averageTimePerQuiz = totalAttempted > 0 ? totalTimeTaken / totalAttempted : 0;
        
        // Calculate pass/fail statistics
        const passedQuizzes = quizAttempts.filter(attempt => {
            const quiz = attempt.quizId;
            const passPercentage = (quiz.passingMarks / quiz.totalMarks) * 100;
            const studentPercentage = (attempt.scoredMarks / quiz.totalMarks) * 100;
            return studentPercentage >= passPercentage;
        }).length;

        const failedQuizzes = totalAttempted - passedQuizzes;

        // Prepare response data - EXACTLY SAME STRUCTURE, just adding rank
        const response = {
            studentInfo: {
                _id: student._id,
                name: student.name,
                enrollmentNumber: student.enrollmentNumber,
                department: student.department,
                course: student.course,
                semester: student.semester
            },
            summary: {
                totalRegisteredQuizzes: totalRegistered,
                totalAttemptedQuizzes: totalAttempted,
                attemptedRatio: totalRegistered > 0 ? ((totalAttempted / totalRegistered) * 100).toFixed(2) + '%' : '0%',
                participationRate: totalRegistered > 0 ? ((totalAttempted / totalRegistered) * 100) : 0,
                averageQuizAttempts: totalRegistered > 0 ? (totalAttempted / totalRegistered).toFixed(2) : 0,
                averageScore: averageScore.toFixed(2),
                overallPercentage: overallPercentage.toFixed(2) + '%',
                highestScore,
                lowestScore: lowestScore === Infinity ? 0 : lowestScore,
                averageTimePerQuiz: formatTime(averageTimePerQuiz),
                totalTimeSpent: formatTime(totalTimeTaken),
                passedQuizzes,
                failedQuizzes,
                passPercentage: totalAttempted > 0 ? ((passedQuizzes / totalAttempted) * 100).toFixed(2) + '%' : '0%'
            },
            performanceTrend: {
                // Last 5 attempts trend
                recentPerformance: quizAttempts.slice(0, 5).map(attempt => ({
                    quizTitle: attempt.quizId.title,
                    score: attempt.scoredMarks,
                    totalMarks: attempt.quizId.totalMarks,
                    percentage: Math.min((attempt.scoredMarks / attempt.quizId.totalMarks) * 100, 100),
                    date: attempt.attemptedAt
                })),
                // Performance over time (group by month)
                monthlyPerformance: getMonthlyPerformance(quizAttempts)
            },
            subjectWiseAnalysis: Object.entries(subjectPerformance).map(([subject, data]) => ({
                subject,
                totalAttempts: data.totalAttempts,
                averageScore: (data.totalMarksObtained / data.totalAttempts).toFixed(2),
                subjectPercentage: ((data.totalMarksObtained / data.totalMarksPossible) * 100).toFixed(2) + '%',
                quizzes: data.quizzes.slice(0, 3) // Show top 3 quizzes per subject
            })),
            departmentWiseAnalysis: Object.entries(departmentPerformance).map(([dept, data]) => ({
                department: dept,
                totalAttempts: data.totalAttempts,
                departmentPercentage: ((data.totalMarksObtained / data.totalMarksPossible) * 100).toFixed(2) + '%',
                averageScore: (data.totalMarksObtained / data.totalAttempts).toFixed(2)
            })),
            quizWiseDetails: Object.values(attemptsByQuiz).map(quizData => {
                const quizId = quizData.quizDetails._id.toString();
                const rankInfo = quizRanks[quizId] || null;
                
                return {
                    quizId: quizData.quizDetails._id,
                    title: quizData.quizDetails.title,
                    subject: quizData.quizDetails.subject,
                    department: quizData.quizDetails.department,
                    course: quizData.quizDetails.course,
                    totalMarks: quizData.quizDetails.totalMarks,
                    passingMarks: quizData.quizDetails.passingMarks,
                    attempts: quizData.attemptCount,
                    bestScore: quizData.bestScore,
                    latestScore: quizData.latestScore,
                    percentage: (quizData.latestScore / quizData.quizDetails.totalMarks) * 100,
                    isPassed: quizData.latestScore >= quizData.quizDetails.passingMarks,
                    latestAttemptDate: quizData.attempts[0].attemptedAt,
                    // NEW: Add rank information (only field added)
                    rank: rankInfo ? {
                        position: rankInfo.rank,
                        totalParticipants: rankInfo.totalParticipants,
                        rankText: `${rankInfo.rank} out of ${rankInfo.totalParticipants}`,
                        percentile: ((rankInfo.totalParticipants - rankInfo.rank) / rankInfo.totalParticipants * 100).toFixed(1) + '%'
                    } : null
                };
            }),
            improvementAreas: identifyImprovementAreas(subjectPerformance, quizAttempts),
            recommendations: generateRecommendations(
                totalRegistered,
                totalAttempted,
                overallPercentage,
                subjectPerformance
            )
        };

        res.status(200).json({
            success: true,
            data: response,
            message: 'Student analytics fetched successfully'
        });

    } catch (error) {
        console.error('Error fetching student analytics:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching analytics',
            error: error.message
        });
    }
};

// Helper function to format time - NO CHANGE
const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
};

// Helper function to calculate monthly performance - NO CHANGE
const getMonthlyPerformance = (quizAttempts) => {
    const monthlyData = {};
    
    quizAttempts.forEach(attempt => {
        const date = new Date(attempt.attemptedAt);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = {
                totalAttempts: 0,
                totalScore: 0,
                totalPossible: 0,
                quizzes: []
            };
        }
        
        monthlyData[monthYear].totalAttempts++;
        monthlyData[monthYear].totalScore += attempt.scoredMarks;
        monthlyData[monthYear].totalPossible += attempt.quizId.totalMarks;
        monthlyData[monthYear].quizzes.push(attempt.quizId.title);
    });
    
    return Object.entries(monthlyData).map(([month, data]) => ({
        month,
        averagePercentage: ((data.totalScore / data.totalPossible) * 100).toFixed(2) + '%',
        totalAttempts: data.totalAttempts,
        averageScore: (data.totalScore / data.totalAttempts).toFixed(2),
        uniqueQuizzes: [...new Set(data.quizzes)].length
    }));
};

// Helper function to identify improvement areas - NO CHANGE
const identifyImprovementAreas = (subjectPerformance, quizAttempts) => {
    const areas = [];
    
    // Find subjects with lowest performance
    const subjectPercentages = Object.entries(subjectPerformance).map(([subject, data]) => ({
        subject,
        percentage: (data.totalMarksObtained / data.totalMarksPossible) * 100
    }));
    
    subjectPercentages.sort((a, b) => a.percentage - b.percentage);
    
    // Get bottom 2 subjects for improvement
    const lowPerformingSubjects = subjectPercentages.slice(0, 2);
    lowPerformingSubjects.forEach(subject => {
        if (subject.percentage < 60) { // Threshold for improvement
            areas.push({
                area: subject.subject,
                currentPercentage: subject.percentage.toFixed(2) + '%',
                recommendation: `Focus on ${subject.subject} concepts. Practice more quizzes in this subject.`
            });
        }
    });
    
    // Check time management
    const recentAttempts = quizAttempts.slice(0, 5);
    const timePerQuestion = recentAttempts.map(attempt => {
        const totalQuestions = attempt.answers.length;
        return attempt.timeTaken / totalQuestions;
    });
    
    const avgTimePerQuestion = timePerQuestion.reduce((a, b) => a + b, 0) / timePerQuestion.length;
    
    if (avgTimePerQuestion > 60) { // If more than 60 seconds per question
        areas.push({
            area: 'Time Management',
            currentAverage: avgTimePerQuestion.toFixed(2) + 's per question',
            recommendation: 'Practice time-bound quizzes to improve speed'
        });
    }
    
    return areas;
};

// Helper function to generate recommendations - NO CHANGE
const generateRecommendations = (totalRegistered, totalAttempted, overallPercentage, subjectPerformance) => {
    const recommendations = [];
    
    // Participation recommendation
    const participationRate = (totalAttempted / totalRegistered) * 100;
    if (participationRate < 80) {
        recommendations.push({
            type: 'Participation',
            message: `You have attempted ${totalAttempted} out of ${totalRegistered} registered quizzes. Try to attempt more quizzes to improve your performance.`,
            priority: 'High'
        });
    }
    
    // Performance recommendation
    if (overallPercentage < 60) {
        recommendations.push({
            type: 'Performance',
            message: `Your overall score is ${overallPercentage.toFixed(2)}%. Aim for at least 70% in upcoming quizzes.`,
            priority: 'High'
        });
    } else if (overallPercentage < 80) {
        recommendations.push({
            type: 'Performance',
            message: `Great job! Your score is ${overallPercentage.toFixed(2)}%. Try to achieve 85%+ in future attempts.`,
            priority: 'Medium'
        });
    } else {
        recommendations.push({
            type: 'Performance',
            message: `Excellent performance! Maintain your consistency of ${overallPercentage.toFixed(2)}%.`,
            priority: 'Low'
        });
    }
    
    // Subject-wise recommendations
    Object.entries(subjectPerformance).forEach(([subject, data]) => {
        const subjectPercentage = (data.totalMarksObtained / data.totalMarksPossible) * 100;
        if (subjectPercentage < 60) {
            recommendations.push({
                type: 'Subject Focus',
                message: `${subject}: Score ${subjectPercentage.toFixed(2)}%. Needs improvement. Review core concepts.`,
                priority: 'High'
            });
        }
    });
    
    return recommendations;
};

// @desc    Get detailed quiz history for a student - MINIMAL CHANGE FOR RANK
// @route   GET /api/student-analytics/:studentId/quiz-history
// @access  Private
const getQuizHistory = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { page = 1, limit = 10, subject, sortBy = 'date', order = 'desc' } = req.query;
        
        // Build query
        const query = { student: studentId };
        
        // If subject filter is provided
        if (subject) {
            const quizzes = await Quiz.find({ subject }).select('_id');
            const quizIds = quizzes.map(q => q._id);
            query.quizId = { $in: quizIds };
        }
        
        // Calculate skip for pagination
        const skip = (page - 1) * limit;
        
        // Get total count
        const total = await QuizAttempt.countDocuments(query);
        
        // Determine sort order
        let sort = {};
        switch (sortBy) {
            case 'score':
                sort = { scoredMarks: order === 'asc' ? 1 : -1 };
                break;
            case 'date':
                sort = { attemptedAt: order === 'asc' ? 1 : -1 };
                break;
            case 'time':
                sort = { timeTaken: order === 'asc' ? 1 : -1 };
                break;
            default:
                sort = { attemptedAt: -1 };
        }
        
        // Get quiz attempts with pagination and populate
        const quizAttempts = await QuizAttempt.find(query)
            .populate('quizId', 'title subject department course totalMarks passingMarks startTime endTime')
            .populate('student', 'name enrollmentNumber')
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));
        
        // Format response - ADDING RANK CALCULATION
        const attempts = await Promise.all(quizAttempts.map(async (attempt) => {
            const quiz = attempt.quizId;
            const percentage = Math.min((attempt.scoredMarks / quiz.totalMarks) * 100, 100);
            const passPercentage = (quiz.passingMarks / quiz.totalMarks) * 100;
            
            // NEW: Calculate rank for this attempt
            let rankInfo = null;
            try {
                // Get all attempts for this quiz
                const allQuizAttempts = await QuizAttempt.find({ quizId: quiz._id })
                    .populate('student', '_id')
                    .sort({ scoredMarks: -1, timeTaken: 1 });
                
                // Group by student to get best attempt
                const studentBestAttempts = {};
                allQuizAttempts.forEach(att => {
                    const studId = att.student._id.toString();
                    
                    if (!studentBestAttempts[studId]) {
                        studentBestAttempts[studId] = att;
                    } else {
                        const existing = studentBestAttempts[studId];
                        if (att.scoredMarks > existing.scoredMarks) {
                            studentBestAttempts[studId] = att;
                        } else if (att.scoredMarks === existing.scoredMarks && 
                                  att.timeTaken < existing.timeTaken) {
                            studentBestAttempts[studId] = att;
                        }
                    }
                });
                
                // Sort best attempts
                const bestAttemptsArray = Object.values(studentBestAttempts)
                    .sort((a, b) => {
                        if (b.scoredMarks !== a.scoredMarks) {
                            return b.scoredMarks - a.scoredMarks;
                        }
                        return a.timeTaken - b.timeTaken;
                    });
                
                // Calculate rank
                let currentRank = 1;
                let previousScore = null;
                let previousTime = null;
                
                for (let i = 0; i < bestAttemptsArray.length; i++) {
                    const att = bestAttemptsArray[i];
                    const currentScore = att.scoredMarks;
                    const currentTime = att.timeTaken;
                    
                    if (i === 0) {
                        att.rank = 1;
                        previousScore = currentScore;
                        previousTime = currentTime;
                    } else {
                        if (currentScore === previousScore && currentTime === previousTime) {
                            att.rank = currentRank;
                        } else {
                            currentRank = i + 1;
                            att.rank = currentRank;
                            previousScore = currentScore;
                            previousTime = currentTime;
                        }
                    }
                    
                    // If this is our student
                    if (att._id.toString() === attempt._id.toString()) {
                        rankInfo = {
                            position: att.rank,
                            totalParticipants: bestAttemptsArray.length,
                            rankText: `${att.rank} out of ${bestAttemptsArray.length}`
                        };
                        break;
                    }
                }
            } catch (error) {
                console.error(`Error calculating rank for attempt ${attempt._id}:`, error);
            }
            
            return {
                attemptId: attempt._id,
                quizId: quiz._id,
                quizTitle: quiz.title,
                subject: quiz.subject,
                department: quiz.department,
                course: quiz.course,
                score: attempt.scoredMarks,
                totalMarks: quiz.totalMarks,
                percentage: percentage.toFixed(2),
                isPassed: percentage >= passPercentage,
                correctCount: attempt.correctCount,
                wrongCount: attempt.wrongCount,
                timeTaken: formatTime(attempt.timeTaken),
                attemptedAt: attempt.attemptedAt,
                quizSchedule: {
                    startTime: quiz.startTime,
                    endTime: quiz.endTime
                },
                // NEW: Add rank field
                rank: rankInfo
            };
        }));
        
        res.status(200).json({
            success: true,
            data: {
                attempts,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / limit),
                    totalAttempts: total,
                    hasNext: (page * limit) < total,
                    hasPrevious: page > 1
                }
            },
            message: 'Quiz history fetched successfully'
        });
        
    } catch (error) {
        console.error('Error fetching quiz history:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching quiz history',
            error: error.message
        });
    }
};

// @desc    Get subject-wise detailed analysis - NO CHANGE
// @route   GET /api/student-analytics/:studentId/subject-analysis
// @access  Private
const getSubjectAnalysis = async (req, res) => {
    try {
        const { studentId } = req.params;
        
        // Get all attempts grouped by subject
        const quizAttempts = await QuizAttempt.find({ student: studentId })
            .populate('quizId', 'title subject totalMarks');
        
        const subjectData = {};
        
        quizAttempts.forEach(attempt => {
            const subject = attempt.quizId.subject;
            
            if (!subjectData[subject]) {
                subjectData[subject] = {
                    totalAttempts: 0,
                    totalCorrect: 0,
                    totalWrong: 0,
                    totalScore: 0,
                    totalPossible: 0,
                    quizzes: [],
                    performanceTrend: []
                };
            }
            
            subjectData[subject].totalAttempts++;
            subjectData[subject].totalCorrect += attempt.correctCount;
            subjectData[subject].totalWrong += attempt.wrongCount;
            subjectData[subject].totalScore += attempt.scoredMarks;
            subjectData[subject].totalPossible += attempt.quizId.totalMarks;
            
            subjectData[subject].quizzes.push({
                quizId: attempt.quizId._id,
                title: attempt.quizId.title,
                score: attempt.scoredMarks,
                totalMarks: attempt.quizId.totalMarks
            });
            
            subjectData[subject].performanceTrend.push({
                date: attempt.attemptedAt,
                score: attempt.scoredMarks,
                percentage: Math.min((attempt.scoredMarks / attempt.quizId.totalMarks) * 100, 100)
            });
        });
        
        // Calculate subject-wise statistics
        const analysis = Object.entries(subjectData).map(([subject, data]) => {
            const accuracy = data.totalCorrect + data.totalWrong > 0 
                ? (data.totalCorrect / (data.totalCorrect + data.totalWrong)) * 100 
                : 0;
            
            const averageScore = data.totalAttempts > 0 
                ? data.totalScore / data.totalAttempts 
                : 0;
            
            const subjectPercentage = data.totalPossible > 0 
                ? (data.totalScore / data.totalPossible) * 100 
                : 0;
            
            // Sort performance trend by date
            data.performanceTrend.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            // Calculate improvement
            let improvement = 0;
            if (data.performanceTrend.length >= 2) {
                const firstScore = data.performanceTrend[0].percentage;
                const lastScore = data.performanceTrend[data.performanceTrend.length - 1].percentage;
                improvement = lastScore - firstScore;
            }
            
            return {
                subject,
                totalAttempts: data.totalAttempts,
                accuracy: accuracy.toFixed(2) + '%',
                averageScore: averageScore.toFixed(2),
                subjectPercentage: subjectPercentage.toFixed(2) + '%',
                totalCorrect: data.totalCorrect,
                totalWrong: data.totalWrong,
                improvement: improvement.toFixed(2) + '%',
                performanceTrend: data.performanceTrend.map(trend => ({
                    date: trend.date,
                    score: trend.score,
                    percentage: trend.percentage.toFixed(2)
                }))
            };
        });
        
        // Sort by percentage (highest first)
        analysis.sort((a, b) => {
            const aPercent = parseFloat(a.subjectPercentage);
            const bPercent = parseFloat(b.subjectPercentage);
            return bPercent - aPercent;
        });
        
        res.status(200).json({
            success: true,
            data: analysis,
            message: 'Subject analysis fetched successfully'
        });
        
    } catch (error) {
        console.error('Error fetching subject analysis:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching subject analysis',
            error: error.message
        });
    }
};

module.exports = {
    getStudentAnalytics,
    getQuizHistory,
    getSubjectAnalysis
};