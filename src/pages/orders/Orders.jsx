 import React, { useContext } from 'react'
 import OrdersHistory from './OrdersHistory';
import { TodoContext } from '../../context/contextApi';
  
const Orders = () => {
  const { cartState, loading } = useContext(TodoContext);

  return (
    /* --- MAIN OUTER CONTAINER --- */
    /* Description: Premium dark container with heavy shadows and deep rounded corners */
    <div className="max-w-6xl mx-auto mt-0 mb-10 bg-[#152b31]/40 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/5 rounded-[32px] overflow-hidden transition-all duration-500">
      
      {/* 📦 PAGE TITLE SECTION */}
      <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-gray-400">
          Purchase <span className="text-green-500">History</span>
        </h2>
        <div className="px-4 py-1 bg-green-500/10 rounded-full border border-green-500/20 text-[10px] font-black text-green-500 uppercase tracking-widest">
          {cartState.orders.length} Completed
        </div>
      </div>

      {/* ✅ SCROLLABLE TABLE BODY */}
      {/* Description: Custom styled scroll area for a smooth browsing experience */}
      <div className="max-h-[500px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

        <table className="w-full table-fixed border-separate border-spacing-0">

          {/* 🔥 STICKY HEADER: Fixed relative to the scroll container */}
          {/* Description: Sticky header with offset to match the high-end UI feel */}
          <thead className="sticky top-0 z-30 bg-[#152b31] border-b border-white/10 shadow-2xl">
            <tr className="text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">
              <th className="px-6 py-5 w-24 text-left">Visual</th>
              <th className="px-6 py-5 w-48 text-center">Product Detail</th>
              <th className="px-6 py-5 w-24 text-center">Unit Price</th>
              <th className="px-6 py-5 w-20 text-center">Qty</th>
              <th className="px-6 py-5 w-32 text-center">Grand Total</th>
            </tr>
          </thead>

          {/* 🚀 TABLE BODY DATA */}
          <tbody className="divide-y divide-white/5">

            {loading ? (
              /* --- DYNAMIC LOADING STATE --- */
              <tr>
                <td colSpan="5" className="py-32 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-12 w-12">
                      <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-t-green-500 animate-spin"></div>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 animate-pulse">
                      Retrieving Orders...
                    </p>
                  </div>
                </td>
              </tr>
            ) : cartState.orders.length > 0 ? (
              /* --- DATA LISTING --- */
              cartState.orders.map((item) => (
                <OrdersHistory key={item._id} ordersItem={item}/>
              ))
            ) : (
              /* --- EMPTY STATE UI --- */
              <tr>
                <td colSpan="5" className="py-32 text-center">
                  <div className="flex flex-col items-center group">
                    <div className="text-6xl mb-6 opacity-20 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0">📦</div>
                    <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.3em]">
                      No Records Found
                    </h3>
                    <p className="text-[10px] text-gray-600 mt-2 font-bold italic">Your vault is currently empty</p>
                  </div>
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      {/* 🧾 FOOTER SECTION */}
      <div className="bg-white/[0.02] p-4 text-center border-t border-white/5">
         <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">
            Transaction History Securely Logged
         </p>
      </div>

    </div>
  )
}

export default Orders