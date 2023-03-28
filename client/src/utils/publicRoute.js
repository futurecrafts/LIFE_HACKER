import { Navigate } from "react-router-dom";

// restricted = false meaning public route
// restricted = true meaning restricted route
export default function PublicRoute({ restricted, children}) {
    const isLogin = localStorage.getItem('token');

    if (isLogin && restricted) {
        return <Navigate to="/api/dashboard" replace />;
    }
    return children;
}