import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/login`, {
        mobileNumber,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // 👇 আগের পেজে রিডাইরেক্ট করো
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath, { replace: true });
      } else {
        setMessage("⚠️ ভুল মোবাইল নম্বর বা পাসওয়ার্ড!");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ সার্ভারে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">লগইন করুন</h2>
        <input
          type="text"
          placeholder="মোবাইল নম্বর"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="password"
          placeholder="পাসওয়ার্ড"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          লগইন
        </button>
        {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
