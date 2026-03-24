 import React from "react";

const CheckOutItems = ({ checkOutData }) => {
  const itemPaid = checkOutData.price * checkOutData.quantity;

  return (
    <tr className="border-b hover:bg-gray-50 transition">

      {/* Image */}
      <td className="px-3 py-2 text-center">
        <img
          className="w-14 h-14 object-cover rounded-md mx-auto"
          src={checkOutData?.image}
          alt=""
        />
      </td>

      {/* Title */}
      <td className="px-3 py-2 text-center text-sm font-semibold truncate">
        {checkOutData.title}
      </td>

      {/* Category */}
      <td className="px-3 py-2 text-center text-xs truncate">
        {checkOutData.category}
      </td>

      {/* Price */}
      <td className="px-3 py-2 text-center font-bold text-green-600 whitespace-nowrap">
        ₹{checkOutData.price}
      </td>

      {/* Paid */}
      <td className="px-3 py-2 text-center font-bold text-green-600 whitespace-nowrap">
        ₹{itemPaid}
      </td>

      {/* Qty FIXED */}
      <td className="px-3 py-2 text-center">
        <div className="flex justify-center">
          
          {/* 🔥 FIX BOX */}
          <span className="min-w-[40px] px-2 py-1 bg-gray-100 rounded-md text-sm font-bold text-center whitespace-nowrap">
            {checkOutData.quantity}
          </span>
        </div>
      </td>

    </tr>
  );
};

export default CheckOutItems;