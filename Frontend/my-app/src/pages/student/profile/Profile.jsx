import "./Profile.css";
import {
  useGetMeQuery,
  useLogoutStudentMutation,
} from "../../../redux/services/studentApi";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/authSlice";
import { useEffect, useState } from "react";
import { studentApi } from "../../../redux/services/studentApi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { data, isLoading, isError } = useGetMeQuery();
  const [logoutStudent] = useLogoutStudentMutation();

  const [student, setStudent] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* 🔥 Set student when API data arrives */
  useEffect(() => {
    if (data) {
      setStudent({
        name: data.name,
        studentId: data.enrollmentNumber,
        email: data.email,
        department: data.department,
        course: data.course,
        year: data.year || "N/A",
        group: data.group,
        semester: data.semester,
        gender: data.gender,
        certificates: data.certificates || [],
      });
    }
  }, [data]);

  /* 🔥 Logout handler */
  const handleLogout = async () => {
    try {
      await logoutStudent().unwrap(); // backend cookie clear
    } catch (error) {
      console.error("Failed to logout:", error);
    } finally {
      setStudent(null); // ✅ student clear
      dispatch(logout()); // redux auth clear
      dispatch(studentApi.util.resetApiState()); // RTK cache clear
      navigate("/student/login");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading profile.</div>;
  if (!student) return <div>Please login</div>;

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
            <span>Gender</span>
            <span>{student.gender}</span>
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

          <div className="profile-row">
            <span>Semester</span>
            <span>{student.semester}</span>
          </div>

          <div className="profile-row">
            <span>Group</span>
            <span>{student.group}</span>
          </div>

          <div className="profile-row">
            <span>Certificates</span>
          <button
  onClick={() =>
    navigate("/student/certificates", {
      state: {
        certificates: student?.certificates || [],
      },
    })
  }
>
  Your Certificates
</button>
          </div>
        </div>

        <button id="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
