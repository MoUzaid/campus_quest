# Campus Quest 

**CampusQuest** is a simple campus app where students can log in, take quizzes, see their scores, and compete on leaderboards.
Admins can create quizzes, manage students, and track performance.
Everything is fast, organized, and easy to use — a small system that makes campus tasks simpler.

folder structure for understanding -
src/
├── api/          → Backend API calls
├── assets/       → Images aur CSS files
├── components/   → Reusable UI components
├── pages/        → App ke pages (Home, Login, Dashboard)
├── routes/       → React Router setup
├── utils/        → Helper functions
├── App.jsx       → Main app component
├── main.jsx      → App entry point
└── index.css     → Global CSS


Routes -

BASE URL
/api

========================
SUPER ADMIN ROUTES
========================
POST   /api/superadmin/register        → Register Super Admin / HOD
POST   /api/superadmin/login           → Login Super Admin
POST   /api/superadmin/forgot-password 
POST   /api/superadmin/reset-password

========================
STUDENT AUTH ROUTES
========================
POST   /students/register            → Student registration
POST   /students/verify-email        → Verify email using OTP
POST   /students/login               → Student login
POST   /students/refresh             → Refresh access token
POST   /students/forgot-password     → Forgot password (send OTP)
POST   /students/reset-password      → Reset password


========================
STUDENT MANAGEMENT
(Faculty / Super Admin)
========================
GET    /students                     → Get all students
GET    /students/:id                 → Get student by ID
DELETE /students/:id                 → Delete student


========================
FEEDBACK ROUTES
========================
POST   /students/feedback            → Submit feedback
GET    /students/all-feedbacks       → Get all feedbacks


========================
QUIZ ROUTES
========================
POST    /quiz/create-quiz          → Create quiz (Faculty)
GET     /quiz/all-quizzes           → Get all quizzes
GET     /quiz/:quizId               → Get quiz details
PUT     /quiz/:quizId               → Update quiz (Faculty)
DELETE  /quiz/:quizId               → Delete quiz (Faculty)


========================
QUIZ PARTICIPATION
========================
POST   /quiz/:quizId/register-student  → Register student for quiz
GET    /quiz/:quizId/start              → Start quiz attempt
POST   /quiz/:quizId/submit             → Submit quiz


========================
QUIZ TIMER
========================
GET    /quiz/:quizId/start-timer   → Faculty start timer
POST   /quiz/:quizId/start-timer   → Create quiz timer
GET    /quiz/:quizId/timer         → Get quiz timer


========================
CERTIFICATE
========================
POST   /quiz/generate-certificate  → Generate quiz certificate


========================
LEADERBOARD
========================
GET    /api/leaderboard/quiz/:quizId      → Get quiz leaderboard


========================
FACULTY ROUTES
========================
POST   /api/faculty/add                   → Add faculty
POST   /api/faculty/login                 → Faculty login
PUT    /api/faculty/update-password       → Update faculty password
DELETE /api/faculty/delete/:facultyId     → Delete faculty (Super Admin)
GET    /api/faculty/all                   → Get all faculty
POST   /api/faculty/refresh_token         → Refresh faculty token


========================
COURSE ROUTES
========================
POST   /api/course/add                   → Create / merge course
GET    /api/course                       → Get all courses
GET    /api/course/:id                   → Get course by ID
PUT    /api/course/:id                   → Update course
DELETE /api/course/:id                   → Delete course

