import "./Profile.css";

const Profile = () => {
  // Temporary mock data (safe)
  const student = {
    name: "mirza",
    studentId: "696969",
    email: "mirza@example.com",
    department: "Computer Application",
    course: "BCA",
    year: "3nd Year",
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1 className="profile-title">Student Profile</h1>

        <div className="profile-info">
          <div className="profile-row">
            <span>Name</span>
            <span>{student.name}</span>
          </div>

          <div className="profile-row">
            <span>Student ID</span>
            <span>{student.studentId}</span>
          </div>

          <div className="profile-row">
            <span>Email</span>
            <span>{student.email}</span>
          </div>

          <div className="profile-row">
            <span>Department</span>
            <span>{student.department}</span>
          </div>

          <div className="profile-row">
            <span>Course</span>
            <span>{student.course}</span>
          </div>

          <div className="profile-row">
            <span>Year</span>
            <span>{student.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
