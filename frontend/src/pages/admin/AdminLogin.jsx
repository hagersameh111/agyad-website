import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginAdmin(email, password);
      if (res.success && res.token) {
        localStorage.setItem("adminToken", res.token);
        navigate("/admin/projects");
      } else {
        setError(res.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F3F4] flex items-center justify-center font-sans" dir="rtl">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#e6e6e8]">
        <h2 className="text-3xl font-bold text-[#8e1b31] mb-6 text-center font-serif">تسجيل الدخول</h2>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[#2b2b2e] text-sm mb-2 font-bold">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#f3f3f4] border border-[#e6e6e8] rounded-lg px-4 py-3 text-[#2b2b2e] focus:outline-none focus:border-[#b3223f] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[#2b2b2e] text-sm mb-2 font-bold">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#f3f3f4] border border-[#e6e6e8] rounded-lg px-4 py-3 text-[#2b2b2e] focus:outline-none focus:border-[#b3223f] transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#b3223f] hover:bg-[#8e1b31] text-white font-bold py-4 rounded-lg transition-colors"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}