
import React, { useContext, useState } from 'react'
 import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router';
import { TodoContext } from '../../context/contextApi';
 
const Payment = () => {
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  const { cartState, cartDispatch } = useContext(TodoContext);

  const totalAmount = cartState.cart.reduce(
    (total, items) => total + items.price * items.quantity,
    0
  );
  const totalText = totalAmount * 0.18;
  const total = totalText + totalAmount;

  const handleClearCart = () => {
    // 🚚 Logic: Save to Order History
    cartDispatch({
      type: 'ORDER_ITEMS',
      payload: { address: JSON.parse(localStorage.getItem('userAddress')), total: total },
    });

    // 🧹 Logic: Wipe Cart Data
    cartDispatch({ type: 'CLEAR_CART', payload: [] });
    localStorage.removeItem('cart');

    // ⏱️ Step 1: Loading State
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setConfirm(true); // ⏱️ Step 2: Confirmation State
    }, 2000);

    // 🚀 Step 3: Back to Home
    setTimeout(() => {
      navigate('/');
    }, 4500);
  }

   const handleCelebrate = () => {
    setTimeout(() => {
      confetti({
        particleCount: 2000,
        spread: 180,
        origin: { y: 0.8 }
      })
    }, 3000);

  };


  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      
      {/* 💳 PREMIUM PAYMENT CARD */}
      <div className={`relative w-full max-w-[400px] p-10 rounded-[40px] border transition-all duration-700 text-center ${
        confirm ? 'bg-green-50 border-green-200 shadow-2xl scale-105' : 'bg-white border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)]'
      }`}>
        
        {/* ICON ANIMATION */}
        <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center text-3xl transition-all duration-500 ${
          confirm ? 'bg-green-500 text-white rotate-[360deg]' : 'bg-blue-50 text-blue-600'
        }`}>
          {success ? '⌛' : confirm ? '✓' : '💳'}
        </div>

        <h1 className={`text-xs font-black uppercase tracking-[0.3em] mb-2 ${confirm ? 'text-green-600' : 'text-gray-400'}`}>
          {confirm ? 'Transaction Secure' : 'Final Authorization'}
        </h1>

        <div className="mb-8">
          <p className={`text-5xl font-black tracking-tighter transition-all duration-500 ${confirm ? 'text-green-600' : 'text-gray-900'}`}>
            ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Inclusive of 18% GST</p>
        </div>

        {/* 🚀 DYNAMIC BUTTON */}
        <button 
        disabled={confirm||success||total===0}
          onClick={() => { handleClearCart(); handleCelebrate(); }}
          className={`w-full h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 active:scale-95 border ${
            success 
            ? 'bg-gray-100 text-gray-400 border-gray-200' 
            : confirm 
            ? 'bg-green-500 text-white border-green-400 shadow-[0_10px_30px_rgba(34,197,94,0.4)]' 
            : 'bg-gray-900 text-white border-gray-900 hover:bg-blue-600 hover:border-blue-600 shadow-2xl shadow-gray-900/20'
          }`}
        >
          {success ? (
            <div className="flex justify-center items-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-gray-600"></div>
              <span>Verifying...</span>
            </div>
          ) : confirm ? (
            "Payment Successful ✓"
          ) : (
            "Complete Payment Now"
          )}
        </button>

        {/* FOOTER INFO */}
        <div className="mt-8 pt-6 border-t border-gray-50">
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            {confirm ? 'Redirecting to Home shortly...' : 'Payment encrypted by Taskly Secure'}
          </p>
        </div>

        {/* SUCCESS GLOW */}
        {confirm && (
          <div className="absolute inset-0 rounded-[40px] ring-4 ring-green-500/20 animate-pulse"></div>
        )}
      </div>
    </div>
  )
}

export default Payment

