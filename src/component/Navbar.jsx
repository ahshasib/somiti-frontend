import React from 'react'
import { Link } from 'react-router'
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className=' bg-gradient-to-r from-indigo-50 to-purple-50 shadow-xl'>
        <div class="navbar w-11/12 mx-auto">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>হোম </a></li>
        <li><a>যোগাযোগ</a></li>
        <li><Link to="/dashboard">ড্যাশবোর্ড</Link></li>
      </ul>
    </div>
    <a class="btn btn-ghost text-xl text-green-500">Somiti</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a>হোম </a></li>
      <li><a>যোগাযোগ</a></li>
      <li><Link to="/dashboard">ড্যাশবোর্ড</Link></li>
    </ul>
  </div>
  <div class="navbar-end">
  {/* <button className="px-5 py-2 cursor-pointer text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 transition-all duration-500">
                        শুরু করুন
    </button> */}
    {user ? <LogoutButton /> : <a href="/login" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">লগইন</a>}
  </div>
</div>
    </div>
  )
}

export default Navbar