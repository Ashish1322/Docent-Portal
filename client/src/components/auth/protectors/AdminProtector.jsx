import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AdminProtectedWrapper({ children }) {
  const { user } = useSelector((state) => state.auth);
  if (user == null) return <Navigate to="/login" />;
  else if (user && user.role != "admin") return <Navigate to="/login" />;
  else return children;
}
