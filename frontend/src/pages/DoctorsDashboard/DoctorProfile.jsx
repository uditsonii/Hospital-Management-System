import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {
  FaVenusMars,
  FaBirthdayCake,
  FaPhone,
  FaEnvelope,
  FaGraduationCap,
  FaCalendarAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  
  const [error, setError] = useState(null);
 const [isSidebarOpen, setSidebarOpen] = useState(false);
   const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      console.error("No token found, please login");
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/doctor/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or server error");
        return res.json();
      })
      .then((data) => {
        setDoctor(data.profile);
        setFormData(data.profile);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch doctor profile:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}/api/doctor/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update profile");
        return res.json();
      })
      .then((data) => {
        setDoctor(data.updatedDoctor || formData);
        setEditMode(false);

        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been successfully updated.",
          confirmButtonColor: "#4CAF50",
          timer: 2000,
          timerProgressBar: true,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Oops! Something went wrong while updating your profile.",
          confirmButtonColor: "#d33",
        });
      });
  };

  if (loading) return <div className="loader">Loading profile...</div>;
  if (!doctor) return <div className="loader">Doctor profile not found</div>;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

    <>
    
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body {
              background: linear-gradient(135deg, #e0f0ff 0%, #f7fbff 100%);
              font-family: 'Poppins', sans-serif;
              margin: 0;
              padding: 0;
              color: #344054;
            }

            .profile-container {
              max-width: 650px;
              margin: 3rem auto;
              background: #fff;
              padding: 3.5rem 3rem;
              border-radius: 24px;
              box-shadow: 0 8px 30px rgba(0, 123, 255, 0.15);
              text-align: center;
            }

            .avatar {
              width: 140px;
              height: 140px;
              background: linear-gradient(135deg, #4f8cff, #335dff);
              color: white;
              font-size: 3.8rem;
              font-weight: bold;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 1.8rem;
              box-shadow: 0 0 15px rgba(51, 93, 255, 0.4);
              letter-spacing: 1px;
            }

            h1 {
              margin-bottom: 2.2rem;
              font-size: 2.6rem;
              font-weight: 700;
              color: #0f1c4d;
            }

            .form-grid {
              display: grid;
              gap: 1.8rem;
              text-align: left;
            }

            .form-field {
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: #f1f5ff;
              border-radius: 14px;
              padding: 1.2rem 1.4rem;
              font-size: 1.25rem;
            }

            .form-field svg {
              color: #4361ee;
              min-width: 26px;
              min-height: 26px;
              margin-right: 0.9rem;
            }

            .label {
              flex: 1;
              font-weight: 600;
              color: #333;
              display: flex;
              align-items: center;
            }

            .value, .edit-input {
              flex: 1.5;
              font-weight: 600;
              color: #111;
              text-align: right;
              font-size: 1.1rem;
              padding-left: 2rem;
            }

            .edit-input {
              text-align: left;
              font-weight: 500;
              padding: 0.4rem 0.6rem;
              border: 1px solid #ccc;
              border-radius: 8px;
              width: 100%;
            }

            .loader {
              text-align: center;
              font-size: 1.8rem;
              padding: 5rem 0;
              color: #4361ee;
              font-weight: 600;
            }

            .edit-btn {
              margin-top: 1.5rem;
              padding: 0.6rem 1.4rem;
              font-size: 1rem;
              font-weight: 600;
              background-color: #4361ee;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              transition: all 0.3s ease;
            }

            .edit-btn:hover {
              background-color: #3354dd;
            }
          `,
        }}
      />

      <motion.div
        className="profile-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="avatar">{getInitials(doctor.name || "Dr")}</div>
        <h1>{doctor.name || "N/A"}</h1>

        <div className="form-grid">
          {[
            { icon: <FaVenusMars />, label: "Gender", field: "gender" },
            { icon: <FaBirthdayCake />, label: "Age", field: "age" },
            { icon: <FaPhone />, label: "Phone", field: "mobile_no" },
            { icon: <FaEnvelope />, label: "Email", field: "email" },
            { icon: <FaGraduationCap />, label: "Degree", field: "degree" },
            {
              icon: <FaCalendarAlt />,
              label: "Joined",
              field: "createdAt",
              readonly: true,
            },
          ].map(({ icon, label, field, readonly }) => (
            <div className="form-field" key={field}>
              <div className="label">
                {icon}
                {label}:
              </div>
              {editMode && !readonly ? (
                <input
                  className="edit-input"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="value">
                  {field === "createdAt"
                    ? new Date(doctor[field]).toLocaleDateString()
                    : doctor[field] || "N/A"}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          className="edit-btn"
          onClick={editMode ? handleSave : () => setEditMode(true)}
        >
          {editMode ? "Save Profile" : "Edit Profile"}
        </button>
      </motion.div>
    </>
    </div>
      </div>
  );
}
