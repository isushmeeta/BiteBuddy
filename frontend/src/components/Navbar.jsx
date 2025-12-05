export default function Navbar() {
  return (
    <nav className="w-full bg-[#E3DCDC] py-4 grid grid-cols-3 items-center px-10 shadow-md">
      
      {/* Left Logo */}
      <div className="bg-pink-300 w-40 h-20 rounded-full flex items-center justify-center text-xl font-semibold tracking-wide">
        BITE BUDDY
      </div>

      {/* Center Title */}
      <h1 className="text-4xl font-bold tracking-wider text-center">
        BITE BUDDY
      </h1>

      {/* Right Circle */}
      <div className="flex justify-end">
        <div className="bg-pink-300 w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold">
          S
        </div>
      </div>

    </nav>
  );
}
