import React, { useState } from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import Aside from "../component/Aside";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [asideOpen, setAsideOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; // অথবা navigate("/login") যদি react-router ব্যবহার করো
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Aside 
        isOpen={asideOpen} 
        onClose={() => setAsideOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="flex items-center justify-between bg-white shadow p-4 sticky top-0 z-50">
          {/* Left: Hamburger */}
          <button
            className="text-2xl text-gray-700 focus:outline-none lg:hidden"
            onClick={() => setAsideOpen(!asideOpen)}
          >
            <FaBars />
          </button>

          {/* Right: Logout */}
          <button
            className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> লগআউট
          </button>
        </nav>

        {/* Main content */}
        <main className="p-8 bg-gray-50 overflow-x-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-50 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
