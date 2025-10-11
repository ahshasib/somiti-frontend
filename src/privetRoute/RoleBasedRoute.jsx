// src/privetRoute/RoleBasedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // যদি লগইন না করা থাকে
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // যদি user-এর role allowed list-এ না থাকে
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // যদি সব ঠিক থাকে
  return children;
};

export default RoleBasedRoute;
