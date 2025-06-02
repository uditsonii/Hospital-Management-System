import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    try {
      // clear the token
      localStorage.removeItem("token");
      // clear the user
      localStorage.removeItem("user");

      alert("Logged out successfully!");
      // redirect to home
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <button onClick={logoutHandler}>Logout</button>
  );
};

export default Logout;