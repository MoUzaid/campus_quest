const cron = require('node-cron');
const Quiz = require('../models/quizModel');
const QuizAttempt = require('../models/QuizAttemptModel');
const generateCertificatePDF = require('../utils/generateCertificatePDF');
const uploadCertificateToCloudinary = require('../utils/uploadCertificate');
const Student = require('../models/studentModel');
const SuperAdmin = require('../models/superAdminModel');
const Faculty = require('../models/FacultyModel');

cron.schedule('*/5 * * * *', async () => {
    console.log('Certificate generation cron job running...');

    const now = new Date();

    try {
        const quizzes = await Quiz.find({
            endTime: { $lt: now },
            certificatesGenerated: false,
        });

        for (const quiz of quizzes) {

            const attempts = await QuizAttempt.find({ quizId: quiz._id })
                .sort({ scoredMarks: -1 });

            const faculty = await Faculty.findById(quiz.createdBy);
            const HOD = await SuperAdmin.findOne({ department: quiz.department });

            let position = 1;

            for (const attempt of attempts) {

                if (attempt.scoredMarks < quiz.passingMarks) continue;

                const student = await Student.findById(attempt.student);
                if (!student) continue;

                const alreadyExists = student.certificates.some(
                    cert => cert.quizId.toString() === quiz._id.toString()
                );
                if (alreadyExists) continue;

                const currentPosition = position;

                const pdfPath = await generateCertificatePDF({
                    studentName: student.name,
                    studentId: student.studentId,
                    quizTitle: quiz.title,
                    facultyName: faculty?.name,
                    facultyDesignation: faculty?.designation,
                    facultyDepartment: faculty?.department,
                    HODName: HOD?.name,
                    HODDesignation: HOD?.designation,
                    HODDepartment: HOD?.department,
                    score: attempt.scoredMarks,
                    totalMarks: quiz.totalMarks,
                    position: currentPosition,
                    date: quiz.startTime.toDateString(),
                    //issuedDate: new Date().toDateString(),
                });

                const certificateUrl = await uploadCertificateToCloudinary(
                    pdfPath,
                    `certificate_${student._id}_${quiz._id}`
                );

                student.certificates.push({
                    quizId: quiz._id,
                    certificateUrl,
                });

                await student.save();

                position++;
            }

            quiz.certificatesGenerated = true;
            await quiz.save();

            console.log(` Certificates generated for quiz: ${quiz.title}`);
        }
    } catch (error) {
        console.error(' Error in certificate generation cron job:', error);
    }
});
