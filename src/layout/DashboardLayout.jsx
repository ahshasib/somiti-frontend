import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "../component/Aside";


const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Aside />

      {/* Main Content */}
      <main className="w-3/3 p-8 bg-gray-50 overflow-x-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
