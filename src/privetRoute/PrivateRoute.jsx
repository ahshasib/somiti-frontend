import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (!user) {
    // যদি লগইন না করা থাকে → লগইন পেজে রিডাইরেক্ট করবে, কিন্তু আগের লোকেশন মনে রাখবে
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
