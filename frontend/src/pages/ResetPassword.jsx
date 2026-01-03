import Navbar from "../components/Navbar";
import api from "../config/axiosConfig";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { KeyRound, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        setIsLoading(true);
        try {
            await api.post(`/auth/reset-password/${token}`, { password });
            toast.success("Password reset successful! Please login.");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.msg || "Failed to reset password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col font-sans">
            <Navbar />

            <div className="flex flex-1 justify-center items-center px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/90 backdrop-blur-sm w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/20"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                            <KeyRound size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Set New Password
                        </h2>
                        <p className="text-gray-500 mt-2">Enter your new password below.</p>
                    </div>

                    <form onSubmit={handleReset} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-600">
                        <Link to="/login" className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
                            <ArrowLeft size={16} />
                            Back to Login
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
