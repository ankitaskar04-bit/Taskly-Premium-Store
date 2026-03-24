import React from 'react'

const OrdersHistory = ({ ordersItem }) => {
  return (
  <>
  {/* --- ORDER META HEADER --- */}
  {/* Description: A sleek separator row for each unique Order ID */}
  <tr className="bg-white/[0.03] border-t border-white/5 group/meta transition-all duration-500">
    <td colSpan="5" className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-md border border-blue-500/20 shadow-sm">
             Order Confirmed
          </span>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            ID: <span className="text-gray-300 font-black">{ordersItem.orderId}</span>
          </p>
        </div>
        <p className="text-[10px] text-white font-black uppercase tracking-widest italic">
          Placed on: <span className="text-gray-400">{ordersItem.date}</span>
        </p>
      </div>
    </td>
  </tr>

  {/* --- PRODUCT ITEMS LOOP --- */}
  {ordersItem.items.map((prod) => (
    <tr key={prod._id} className="group/item border-b border-white/5 hover:bg-white/[0.02] transition-all duration-300">
      
      {/* Product Image with Hover Zoom */}
      <td className="px-6 py-5 text-left">
        <div className="relative h-14 w-14 p-1 bg-white rounded-xl shadow-inner group-hover/item:rotate-3 transition-transform duration-500">
          <img src={prod.image} alt={prod.title} className="h-full w-full object-contain rounded-lg" />
        </div>
      </td>

      {/* Title with subtle glow on hover */}
      <td className="px-6 py-5 text-center">
        <p className="text-xs font-black text-gray-300 group-hover/item:text-white transition-colors truncate max-w-[180px] mx-auto uppercase tracking-tighter">
          {prod.title}
        </p>
      </td>

      {/* Unit Price */}
      <td className="px-6 py-5 text-center">
        <span className="text-[11px] font-bold text-gray-500 italic tracking-tighter">
          ₹{prod.price.toLocaleString()}
        </span>
      </td>

      {/* Quantity Badge */}
      <td className="px-6 py-5 text-center">
        <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-gray-400">
          x{prod.quantity}
        </span>
      </td>

      {/* Item Total Price */}
      <td className="px-6 py-5 text-center">
        <p className="text-sm font-black text-green-500/80 group-hover/item:text-green-400 transition-all tracking-tighter">
          ₹{(prod.price * prod.quantity).toLocaleString()}
        </p>
      </td>
    </tr>
  ))}

  {/* --- ORDER FOOTER SUMMARY --- */}
  {/* Description: Summarizes the total for the specific order ID */}
  <tr className="bg-black/20 border-b-4 border-[#0a191e]">
    <td colSpan="4" className="text-right px-8 py-4">
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
        Order Net Total
      </span>
    </td>
    <td className="text-center px-6 py-4">
      <div className="relative inline-block">
        <span className="text-lg font-black text-blue-400 tracking-tighter">
          ₹{ordersItem.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
        {/* Underline decorative bar */}
        <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500/30 rounded-full"></div>
      </div>
    </td>
  </tr>
</>
  )
}

export default OrdersHistory;