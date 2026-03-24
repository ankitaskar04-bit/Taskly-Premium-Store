import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { LoginSchema } from "../zod/LoginSchema";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { TodoContext } from "../context/contextApi";

const Signup = () => {
  const { setLogout } = useContext(TodoContext)
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [showEye, setShowEye] = useState(false);

  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handlesave = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    if (error[e.target.name]) {
      setError({ ...error, [e.target.name]: "" });
    }
  };





  const handleForm = (e) => {
    e.preventDefault();
    const result = LoginSchema.safeParse(signup);

    if (!result.success) {
      const existing = {};
      result.error.issues.forEach((item) => { existing[item.path[0]] = item.message; });
      setError(existing);
      return;
    }

    const displayName = signup.email.split('@')[0];

    const existingData = localStorage.getItem("signup");
    const users = existingData ? JSON.parse(existingData) : [];

    const usersArray = Array.isArray(users) ? users : [users];

    const updatedUsers = [...usersArray, { ...signup, displayName }];
    localStorage.setItem("signup", JSON.stringify(updatedUsers));

    localStorage.setItem("login", JSON.stringify({ ...signup, displayName }));


 
    setSuccess(true);
    setLogout(true);

    setTimeout(() => {
      setSuccess(false);
    }, 2000);

    setConfirm(true);
    setTimeout(() => {
      setConfirm(false)
      navigate('/');
    }, 4000);


  };

  return (
    <div className="mt-0 min-h-screen flex items-center justify-center bg-[#0a191e] p-6">
      {/* Main Card */}
      <div className="w-full max-w-md bg-[#152b31] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[40px] p-10 border border-white/5 relative overflow-hidden">

        {/* Background Glow Decorations */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-600/20 blur-[60px] rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full"></div>

        <div className="relative z-10">
          <h2 className="text-4xl font-black mb-2 text-white tracking-tighter text-center">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-center text-sm mb-10 font-medium">
            Signup Create Account 🚀
          </p>

          <form onSubmit={handleForm} className="space-y-6">
            {/* Name Field */}

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Name</label>
              <input
                className={`w-full bg-[#0d1e24] p-4 rounded-2xl text-white outline-none border-2 transition-all duration-300 ${error.email ? 'border-red-500/50' : 'border-white/5 focus:border-green-500/50'}`}
                type="text"
                name="name"
                value={signup.name}
                placeholder="Enter Your Name"
                onChange={handlesave}
              />
              {error.name && <p className="text-[10px] text-red-400 font-bold uppercase ml-2 tracking-tighter animate-bounce">{error.email}</p>}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input
                className={`w-full bg-[#0d1e24] p-4 rounded-2xl text-white outline-none border-2 transition-all duration-300 ${error.email ? 'border-red-500/50' : 'border-white/5 focus:border-green-500/50'}`}
                type="text"
                name="email"
                value={signup.email}
                placeholder="name@example.com"
                onChange={handlesave}
              />
              {error.email && <p className="text-[10px] text-red-400 font-bold uppercase ml-2 tracking-tighter animate-bounce">{error.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <input
                  className={`w-full bg-[#0d1e24] p-4 rounded-2xl text-white outline-none border-2 transition-all duration-300 ${error.password ? 'border-red-500/50' : 'border-white/5 focus:border-green-500/50'}`}
                  type={showEye ? "text" : "password"}
                  name="password"
                  value={signup.password}
                  placeholder="••••••••"
                  onChange={handlesave}
                />
                {error.password && <p className="text-[10px] text-red-400 font-bold uppercase ml-2 tracking-tighter animate-bounce">{error.password}</p>}
                <button type="button" className="absolute right-4 top-6 text-white" onClick={() => setShowEye(!showEye)}>{showEye ? <FaEyeSlash /> : <FaEye />}</button>
              </div>
            </div>

            {/* signup Button */}
            <button
              type="submit"
              disabled={success || confirm}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 relative overflow-hidden group 
                 ${success ? 'bg-green-600' : confirm ? 'bg-cyan-900 scale-105 shadow-[0_0_30px_rgba(8,145,178,0.3)]' : 'bg-green-600 hover:bg-green-500 hover:shadow-[0_10px_20px_rgba(22,163,74,0.3)] active:scale-95 text-white'}`}
            >
              {success ? (
                <div className="flex justify-center items-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                  <span>Verifying...</span>
                </div>
              ) : confirm ? (
                <span className="animate-pulse">Singup Successful!</span>
              ) : (
                <span>Signup</span>
              )}
            </button>

            {/* Footer Link */}
            <div className="text-center pt-4">
              <p className="text-gray-500 text-sm font-medium">
                Already Account
                <a href="/login" className="text-green-500 font-black ml-2 hover:underline decoration-2 underline-offset-4 transition-all">
                  Go to Loign
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;