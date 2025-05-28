import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      console.log('fallback in case user not found!')
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      console.log(JSON.parse(userData));
      setUser(JSON.parse(userData));

      // Role base check
      if (parsedUser.role === "patient") {
        navigate("/patient-dashboard");
      } else if (parsedUser.role === "doctor") {
        navigate("/doctor-dashboard");
      } else if (parsedUser.role === "admin") {
        navigate("/admin");
      } else if (parsedUser.role === "opd") {
        navigate("/opd");
      } else {
        navigate("/unauthorized");
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

export default Dashboard;
