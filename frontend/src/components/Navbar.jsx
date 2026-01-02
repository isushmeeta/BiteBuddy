import { Link, useNavigate } from "react-router-dom";
import { UserCircle, UtensilsCrossed, ShoppingCart, LogOut } from "lucide-react";
import api from "../config/axiosConfig";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Server-side logout failed:", err);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 fixed w-full top-0 left-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">

      {/* Logo Area */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all">
          <UtensilsCrossed className="text-white" size={24} />
        </div>
        <div className="text-white font-[Didot] text-xl font-bold tracking-wider group-hover:opacity-90 transition-opacity">
          BITE BUDDY
        </div>
      </Link>

      {/* Actions: Cart & Profile */}
      <div className="flex items-center gap-6">
        {localStorage.getItem("token") ? (
          <>
            <Link to="/cart" className="relative group">
              <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all text-white">
                <ShoppingCart size={24} />
              </div>
            </Link>

            <Link to="/profile" className="flex items-center gap-2 text-white hover:text-indigo-100 transition-colors">
              <UserCircle size={32} strokeWidth={1.5} />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="px-5 py-2 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition-all border border-white/20 backdrop-blur-sm">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg">
              Register
            </Link>
          </div>
        )}
      </div>

    </nav>
  );
}
