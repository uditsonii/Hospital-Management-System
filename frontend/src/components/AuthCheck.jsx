import { Navigate } from "react-router-dom";

const AuthCheck = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to={'/login'} />
}

export default AuthCheck;