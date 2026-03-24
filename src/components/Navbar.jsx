import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import Product from "../pages/product/Product";
import { TodoContext } from "../context/Context";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartState, logout, setLogout, search, setSearch, category, setCategory, productState } =
    useContext(TodoContext);

  const categories = [
    "All", ...new Set(productState.product.map((p) => p.category)),
  ];


  const totalItems = cartState.cart.reduce(
    (total, items) => total + items.quantity, 0
  );

  const handePathname = () => {
    if (location.pathname === '/') return <Product />;
  }

  const user = JSON.parse(localStorage.getItem("login"));

  const handleCheckAuth = () => {
    const user = JSON.parse(localStorage.getItem("signup"));
    if (!user) {
      navigate('/signup')
    }
  }

  return (
    <>
      {handePathname() && (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0a191e]/80 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-20">

              {/* 🚀 LOGO Section */}
              <div
                onClick={() => navigate("/")}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.3)] group-hover:rotate-12 transition-all duration-300">
                  <span className="text-white font-black text-xl">T</span>
                </div>
                <h1 className="text-2xl font-black tracking-tighter text-white">
                  TASK<span className="text-green-500">LY</span>
                </h1>
              </div>

              {/* 🔍 CENTER: Search & Filter */}
              <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-2xl p-1 gap-2 focus-within:border-green-500/50 transition-all duration-300">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-transparent text-gray-400 text-[11px] font-bold uppercase tracking-wider px-4 py-2 outline-none cursor-pointer hover:text-white transition"
                >
                  {categories.map((item) => (
                    <option key={item} value={item} className="bg-[#0a191e] text-white">
                      {item}
                    </option>
                  ))}
                </select>

                <div className="w-[1px] h-6 bg-white/10"></div>

                <input
                  type="text"
                  value={search}
                  placeholder="Search items..."
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[280px] bg-transparent px-4 py-2 text-sm text-white placeholder-gray-500 outline-none"
                />
              </div>

              {/* 🛒 RIGHT SECTION */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => navigate('/orders')}
                  className="hidden lg:block text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-gray-300 hover:bg-green-500 hover:text-[#0a191e] transition-all duration-300 active:scale-95"
                >
                  My Orders
                </button>

                <div
                  className="relative cursor-pointer p-2 hover:bg-white/5 rounded-full transition-all group"
                >
                  <span onClick={() => {
                    navigate("/cart")
                    handleCheckAuth();
                  }
                  }
                    className="text-xl group-hover:scale-110 block transition">🛒</span>
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 bg-green-500 text-[#0a191e] text-[10px] h-5 w-5 flex items-center justify-center rounded-full font-black shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                      {totalItems}
                    </span>
                  )}
                </div>

                {logout ? (
                  <div className="flex items-center group ml-2">
                    <div className="relative flex items-center bg-white/5 border border-white/10 backdrop-blur-md h-11 px-4 rounded-l-xl border-r-0 transition-all group-hover:bg-white/10">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 font-black text-[10px] uppercase tracking-widest">
                        {user.displayName}
                      </span>
                      <div className="ml-2 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    </div>
                    <button
                      className="h-11 px-5 bg-red-500/50 hover:bg-red-500 text-white font-black text-[10px] uppercase tracking-widest border border-red-500/20 rounded-r-xl transition-all duration-300"
                      onClick={() => {
                        localStorage.removeItem('login');
                        setLogout(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3 items-center ml-2">
                    <button onClick={() => navigate('/login')} className="text-[11px] font-black uppercase tracking-widest text-white hover:text-green-400">
                      Login
                    </button>
                    <button onClick={() => navigate('/signup')} className="px-6 py-2.5 bg-green-500 text-[#0a191e] text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all active:scale-95">
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;