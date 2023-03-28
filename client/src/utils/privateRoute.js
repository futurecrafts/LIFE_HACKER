import { Navigate } from "react-router-dom";

// Show the component only when the user is logged in
// Otherwise, redirect the user to /api/login page
export default function PrivateRoute({children}) {
    const isLogin = localStorage.getItem('token');

    if (!isLogin) {
        return <Navigate to="/api/login" replace />;
    }
    return children;
}