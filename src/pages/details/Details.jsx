 import React, { useContext } from 'react';
 import { useParams, useNavigate } from 'react-router';
import {VscArrowLeft } from "react-icons/vsc";
import { TodoContext } from '../../context/contextApi';

const Details = () => {
  const { productState, cartDispatch } = useContext(TodoContext);
  const { id } = useParams();  
  const navigate = useNavigate();

 
  const data = productState.product.find((p) => p._id === parseInt(id) || p._id === id);

  if (!data) return (
    <div className="h-screen flex items-center justify-center text-white">
      <h2 className="text-2xl font-black uppercase tracking-widest">NO Single Page Found! 🚫</h2>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-10">
      {/* 🔙 Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-green-400 transition-all font-black uppercase text-[10px] tracking-[0.3em]"
      >
        <VscArrowLeft className="text-xl" /> Go Back
      </button>

      {/* 💎 Main Glass Container */}
      <div className="max-w-6xl mx-auto bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col lg:flex-row items-center">
          
          {/* 🖼️ Image Section */}
          <div className="w-full lg:w-1/2 p-10 flex justify-center relative group">
            {/* Background Glow */}
            <div className="absolute w-64 h-64 bg-green-500/20 blur-[100px] rounded-full group-hover:bg-green-500/30 transition-all"></div>
            
            <img 
              src={data.image || data.thumbnail} 
              alt={data.title}
              className="relative z-10 w-full max-h-[400px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105" 
            />
          </div>

          {/* 📝 Content Section */}
          <div className="w-full lg:w-1/2 p-10 lg:p-16 bg-white/[0.02] border-l border-white/5">
            <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] rounded-full">
              {data.category}
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
              {data.title}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-500">
                <span className="text-lg">⭐</span>
                <span className="text-sm font-black text-gray-300">{data?.rating}</span>
              </div>
              <div className="h-4 w-[1px] bg-white/10"></div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Verified Quality</span>
            </div>

            <p className="mt-8 text-gray-400 text-sm leading-relaxed font-medium">
              {data.description}
            </p>

            <div className="mt-10 pt-10 border-t border-white/5 flex items-end justify-between">
              <div>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Price</p>
                <h2 className="text-5xl font-black text-green-500 tracking-tighter">
                  ${data.price}
                </h2>
              </div>

              {/* 🚀 Action Button */}
              <button 
                onClick={() => cartDispatch({ type: 'ADD_TO_CART', payload: data })}
                className="group relative px-8 py-4 bg-green-500 text-[#0a191e] font-black uppercase text-xs tracking-widest rounded-2xl shadow-[0_20px_40px_-10px_rgba(34,197,94,0.4)] hover:bg-white hover:shadow-white/20 transition-all active:scale-95"
              >
                Add To Bag
                {/* Subtle Glow on Button */}
                <div className="absolute inset-0 rounded-2xl group-hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] transition-all"></div>
              </button>
            </div>
          </div>

        </div>
      </div>
      
      {/* 💡 Feature Points */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          { icon: "🛡️", title: "Secure Payment", desc: "100% Encrypted Transactions" },
          { icon: "🚚", title: "Free Shipping", desc: "On all orders above $100" },
          { icon: "🔄", title: "Easy Returns", desc: "30 Days Return Policy" }
        ].map((item, index) => (
          <div key={index} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center gap-4">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{item.title}</h4>
              <p className="text-[9px] text-gray-500 font-bold uppercase">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Details;