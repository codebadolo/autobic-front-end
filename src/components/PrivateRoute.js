import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default PrivateRoute;
