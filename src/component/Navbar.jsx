import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import LogoutButton from "./LogoutButton";
import axios from "axios";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/logo-get`);
        

        // ✅ যদি একটাই অবজেক্ট রিটার্ন করে
        if (res.data && res.data.logoUrl) {
          setLogo(res.data.logoUrl);
        }
        // ✅ যদি অ্যারে আকারে রিটার্ন করে (যেমন: [ { logoUrl: "..." } ])
        else if (Array.isArray(res.data) && res.data.length > 0) {
          setLogo(res.data[0].logoUrl);
        }
      } catch (err) {
        console.error("Logo fetch error:", err);
      }
    };
    fetchLogo();
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 shadow-xl">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li className="font-bold"><Link to="/">হোম</Link></li>
              
              <li className="font-bold"><Link to="/dashboard">ড্যাশবোর্ড</Link></li>
            </ul>
          </div>

          {/* ✅ Dynamic Logo Section */}
          <div className="flex items-center gap-2">
            {logo ? (
              <img
                src={logo}
                alt="Logo"
                className="w-12 h-12 object-contain rounded"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 animate-pulse rounded"></div>
            )}
           
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          <li className="font-bold text-green-500"><Link to="/">হোম</Link></li>
              
              <li className="font-bold text-green-500"><Link to="/dashboard">ড্যাশবোর্ড</Link></li>
          </ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <LogoutButton />
          ) : (
            <a
              href="/login"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              লগইন
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
