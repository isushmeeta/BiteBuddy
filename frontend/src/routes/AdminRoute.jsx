import { Link } from "react-router-dom";

export default function AdminRoute({ children }) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.name === "admin") {
        return children;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF2F8]">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied! 🚫</h1>
            <p className="text-lg text-gray-700 mb-6">
                You do not have permission to view this page.
            </p>
            <Link
                to="/"
                className="px-6 py-2 bg-[#B197A4] text-white rounded hover:bg-[#8e7482] transition"
            >
                Go to Home
            </Link>
        </div>
    );
}
