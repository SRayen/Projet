import { Outlet, Navigate } from "react-router-dom";
import { userStatusStore } from "./stores/userStatusStore";

const ProtectedRoutes = () => {
  const { status } = userStatusStore();
  return <div>{status ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default ProtectedRoutes;
