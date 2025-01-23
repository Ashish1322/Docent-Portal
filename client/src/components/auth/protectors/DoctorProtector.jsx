import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function DoctorProtectedWrapper({ children }) {
  const { user } = useSelector((state) => state.auth);
  if (user == null) return <Navigate to="/login" />;
  else if (user && user.role != "doctor") return <Navigate to="/login" />;
  else return children;
}
