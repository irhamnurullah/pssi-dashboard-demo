import React from "react";
import { Navigate } from "react-router-dom";
import sessions from "../../utils/sessions";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessions.getSessionToken();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
