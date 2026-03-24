 import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { LoginSchema } from "../zod/LoginSchema";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { TodoContext } from "../context/Context";
 
const Login = () => {
  const { login, setLogin, loginUser, setLogout } = useContext(TodoContext);
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [error, setError] = useState({});
  const [authError, setAuthError] = useState("");  

  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from?.pathname || "/";

  const handlesave = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    if (error[e.target.name]) {
      setError({ ...error, [e.target.name]: "" });
    }
    if (authError) setAuthError("");  
  };

  const handleForm = (e) => {
    e.preventDefault();
    setError({});
    setAuthError(""); 

    // 1. Zod Validation
    const result = LoginSchema.safeParse(login);
    if (!result.success) {
      const existing = {};
      result.error.issues.forEach((item) => {
        existing[item.path[0]] = item.message;
      });
      setError(existing);
      return;
    }

    // 2. Context Login Logic
    const response = loginUser(login, destination, navigate);

    if (response.success === true) { 
      setLogin({ email: "", password: "" });
      setSuccess(true);
      setLogout(true);
      setTimeout(() => setSuccess(false), 2000);

      setConfirm(true);
      setTimeout(() => {
        setConfirm(false);
        navigate('/')
      }, 4000);
    } else {
   
      setAuthError(response.message || "Invalid credentials. Please try again.");
      setSuccess(false)
      setConfirm(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a191e] p-6">
      <div className="w-full max-w-md bg-[#152b31] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[40px] p-10 border border-white/5 relative overflow-hidden">
        
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-600/20 blur-[60px] rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full"></div>

        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-2 text-white tracking-tighter text-center">Welcome Back</h2>
          <p className="text-gray-400 text-center text-sm mb-10 font-medium tracking-tight">Login to continue your shopping spree 🚀</p>

          <form onSubmit={handleForm} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input
                className={`w-full bg-[#0d1e24] p-4 rounded-2xl text-white outline-none border-2 transition-all duration-300 ${error.email ? 'border-red-500/50' : 'border-white/5 focus:border-green-500/50'}`}
                type="text" name="email" value={login.email} placeholder="name@example.com" onChange={handlesave}
              />
              {error.email && <p className="text-[10px] text-red-400 font-bold uppercase ml-2 tracking-tighter">{error.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <input
                  className={`w-full bg-[#0d1e24] p-4 rounded-2xl text-white outline-none border-2 transition-all duration-300 ${error.password ? 'border-red-500/50' : 'border-white/5 focus:border-green-500/50'}`}
                  type={showEye ? "text" : "password"} name="password" value={login.password} placeholder="••••••••" onChange={handlesave}
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white" onClick={() => setShowEye(!showEye)}>
                  {showEye ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              {error.password && <p className="text-[10px] text-red-400 font-bold uppercase ml-2 tracking-tighter">{error.password}</p>}
            </div>

            {/* 🚨 Wrong Credentials Message */}
            {authError && (
              <p className="text-[10px] text-red-400 font-black uppercase text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20 tracking-widest animate-pulse">
                {authError}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit" disabled={success || confirm}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 
                ${success ? 'bg-green-600' : confirm ? 'bg-cyan-900 scale-105 shadow-[0_0_20px_rgba(8,145,178,0.3)]' : 'bg-green-600 hover:bg-green-500 active:scale-95 text-white shadow-lg shadow-green-900/20'}`}
            >
              {success ? "Verifying..." : confirm ? "Success!" : "Login"}
            </button>

            <div className="text-center pt-4">
              <p className="text-gray-500 text-sm font-medium">Don't have an account?
                <a href="/signup" className="text-green-500 font-black ml-2 hover:underline decoration-2 underline-offset-4">Create One</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;