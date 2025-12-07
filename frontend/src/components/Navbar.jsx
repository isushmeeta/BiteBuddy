//src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-[#B08EA3] px-6 py-4 shadow-md">
      
      {/* Logo Circle */}
      <div className="bg-[#F4A7B9] rounded-full px-8 py-3 text-black font-[Didot] text-2xl font-semibold">
        BITE BUDDY
      </div>

      {/* Title */}
      <div className="flex-grow mx-6 bg-[#D3D3D3] text-center py-2 rounded-lg text-4xl font-bold font-itim">
        BITE BUDDY
      </div>

      {/* Profile Icon */}
      <Link to="/profile">
        <FaUserCircle className="text-[#333] hover:text-black transition text-5xl cursor-pointer" />
      </Link>

    </nav>
  );
}
