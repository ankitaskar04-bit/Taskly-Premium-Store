import React, { useContext, useState } from "react";
import CartItems from "./CartItems";
import { useNavigate } from "react-router";
import { FaArrowCircleLeft } from "react-icons/fa";
import { TodoContext } from "../../context/Context";
 const Cart = () => {
  const { cartState } = useContext(TodoContext);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cartState.cart.reduce((total, items) => total + (items.price * items.quantity), 0);
  const textAmount = totalPrice * 0.18;
  const totalAmount = totalPrice + textAmount;

  const handleLoading = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate('/checkout')
    }, 2000);
  }

  

  return (
    <div className="mt-0 px-4 max-w-[1300px] mx-auto pb-20">

      <div className="flex items-center gap-6 mb-12 group">

        {/* 🔙 BACK BUTTON: Floating Neon Style */}
        {/* Description: Interactive back button with hover-glow and leftward movement animation */}
        <button
          onClick={() => navigate('/')}
          className="relative flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-500 group/back active:scale-90 shadow-xl"
        >
          <FaArrowCircleLeft className="text-2xl group-hover/back:-translate-x-1 transition-transform duration-300" />
          {/* Subtle Glow behind the button */}
          <div className="absolute inset-0 bg-green-500/0 group-hover/back:bg-green-500/5 blur-xl rounded-full transition-all duration-500"></div>
        </button>

        {/* 🏷️ HEADING SECTION */}
        {/* Description: Bold typography with a dynamic item counter badge */}
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-green-500/60 mb-1 ml-1">
            Your Curated Selection
          </span>
          <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-4">
            My Shopping <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Bag</span>

            {/* 🛒 ITEM COUNTER BADGE */}
            <span className="flex items-center justify-center bg-white/10 border border-white/10 px-4 py-1 rounded-full text-xs font-black text-green-400 backdrop-blur-md shadow-inner">
              {cartState.cart.length}
            </span>
          </h1>
        </div>

      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* 🔥 TABLE */}
        <div className="flex-1 w-full bg-white shadow-xl rounded-3xl border border-gray-100 overflow-hidden">

          {/* ✅ ONLY VERTICAL SCROLL */}
          <div className="max-h-[550px] overflow-y-auto overflow-x-hidden">

            <table className="w-full table-fixed border-collapse">

              {/* HEADER */}
              <thead className="sticky top-0 z-40 bg-gray-50/95 backdrop-blur-md border-b">
                <tr className="text-gray-500 text-[11px] uppercase tracking-wide font-bold">

                  <th className="px-3 py-3 w-16 text-left">Product</th>
                  <th className="px-3 py-3 w-28 text-center">Title</th>
                  <th className="px-3 py-3 w-40 text-center">Description</th>
                  <th className="px-3 py-3 w-24 text-center">Category</th>
                  <th className="px-3 py-3 w-16 text-center">Price</th>
                  <th className="px-3 py-3 w-16 text-center">Rating</th>
                  <th className="px-3 py-3 w-24 text-center">Qty</th>
                  <th className="px-3 py-3 w-24 text-center">Remove</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {cartState.cart.length > 0 ? (
                  cartState.cart.map((item) => (
                    <CartItems key={item.id} carts={item} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-24 text-center text-gray-400">
                      Carts are empty... 🛍️
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* 🔥 COMPACT CalCulation SUMMARY */}
        {cartState.cart.length > 0 && (
          <div className="w-full lg:w-[350px] sticky top-28 bg-[#152b31]/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden relative group">

            {/* --- DECORATIVE GLOWS --- */}
            {/* Description: Subtle background glows to give a futuristic feel */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 blur-[50px] rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full"></div>

            <div className="relative z-10">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-gray-500 border-b border-white/5 pb-4">
                Total <span className="text-green-500">Summary</span>
              </h3>

              <div className="space-y-5 text-sm">

                {/* SUB TOTAL */}
                {/* Description: Highlighting the base price with elegant spacing */}
                <div className="flex justify-between items-center group/row">
                  <span className="text-gray-400 font-medium group-hover/row:text-gray-200 transition-colors">Subtotal</span>
                  <span className="text-white font-black tracking-tighter">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* SHIPPING */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">Delivery</span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-500/20">
                    FREE
                  </span>
                </div>

                {/* TAXES */}
                <div className="flex justify-between items-center pb-2">
                  <span className="text-gray-400 font-medium">Estimated Tax</span>
                  <span className="text-white font-black tracking-tighter">₹{textAmount.toFixed(2)}</span>
                </div>

                {/* DIVIDER */}
                <div className="border-t border-dashed border-white/10 pt-6 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Total Payable</p>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tighter">
                      ₹{totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-10 w-10 bg-green-500/10 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-green-500 text-xs">📉</span>
                  </div>
                </div>

                {/* CHECKOUT BUTTON */}
                {/* Description: Highly interactive button with loading state and neon hover effects */}
                <button
                  className={`w-full relative group mt-6 h-14 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden border ${success
                    ? 'bg-green-600 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.4)]'
                    : 'bg-white text-[#0a191e] border-white hover:bg-transparent hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
                    }`}
                  onClick={handleLoading}
                  disabled={success}
                >
                  {success ? (
                    <div className="flex justify-center items-center gap-3">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0a191e] border-t-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <span>Secure Checkout</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  )}
                </button>

                {/* TRUST BADGE */}
                <p className="text-center text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-6">
                  🔒 Encrypted & Secure Checkout
                </p>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;