import React, { useState } from "react";
import "./AddFaculty.css";

const AddFaculty = () => {
  const [formData, setFormData] = useState({
    facultyId: "",
    name: "",
    email: "",
    mobileNumber: "",
    department: "",
    designation: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/faculty/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}` // 🔐 SuperAdmin token
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to add faculty");
        setLoading(false);
        return;
      }

      setMessage("✅ Faculty added successfully!");
      setFormData({
        facultyId: "",
        name: "",
        email: "",
        mobileNumber: "",
        department: "",
        designation: "",
        password: ""
      });
    } catch (error) {
      console.error("Add faculty error:", error);
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };
console.log("Submitting:", formData);
  return (
    <div className="add-faculty-container">
      <h2>👨‍🏫 Add Faculty</h2>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="add-faculty-form">
        <input
          type="text"
          name="facultyId"
          placeholder="Faculty ID"
          value={formData.facultyId}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="designation"
          placeholder="Designation (e.g. Assistant Professor)"
          value={formData.designation}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Temporary Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

      console.log("Submitting:", formData);

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Faculty"}
        </button>
      </form>
    </div>
  );
};

export default AddFaculty;
