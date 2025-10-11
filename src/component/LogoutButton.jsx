import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // user data মুছে ফেলা
    navigate("/login"); // login পেজে পাঠানো
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      লগআউট
    </button>
  );
};

export default LogoutButton;
