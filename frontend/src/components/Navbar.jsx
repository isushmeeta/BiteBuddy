import { Link } from "react-router-dom";
import { UserCircle, UtensilsCrossed, ShoppingCart } from "lucide-react";

export default function Navbar() {
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
        <Link to="/cart" className="relative group">
          <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all text-white">
            <ShoppingCart size={24} />
          </div>
        </Link>

        <Link to="/profile" className="flex items-center gap-2 text-white hover:text-indigo-100 transition-colors">
          <UserCircle size={32} strokeWidth={1.5} />
        </Link>
      </div>

    </nav>
  );
}
