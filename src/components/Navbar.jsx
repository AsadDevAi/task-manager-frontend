import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vazifalar Menejeri</h1>
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold">{user?.fullName}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          >
            Chiqish
          </button>
        </div>
      </div>
    </nav>
  );
}
