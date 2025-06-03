import { Navigate } from "react-router-dom";

const AuthCheck = ({ children, role }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    // return token ? children : <Navigate to={'/login'} />
    
  if (!token || !user) return <Navigate to="/login" />;

  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
}

export default AuthCheck;