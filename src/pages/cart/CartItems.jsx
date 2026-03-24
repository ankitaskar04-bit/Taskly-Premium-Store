import React, { useContext, useState } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { AiTwotoneMinusCircle } from "react-icons/ai";
import { TodoContext } from "../../context/contextApi";

const CartItems = ({ carts }) => {
  const { cartDispatch } = useContext(TodoContext);
  const [confirm, setConfirm] = useState(false);

  const handleQuantityAdd = () =>
    cartDispatch({ type: "ADD_TO_CART", payload: carts });

  const handleQuantityDecreased = () =>
    cartDispatch({ type: "QUANTITY_DECREASED", payload: carts });

  const handleRemove = () => {
    cartDispatch({ type: "REMOVE_ITEM", payload: carts });
    setConfirm(false);
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">

      {/* Image */}
      <td className="px-3 py-2 text-center">
        <img
          className="w-14 h-14 object-cover rounded-md mx-auto"
          src={carts?.image}
          alt=""
        />
      </td>

      {/* Title */}
      <td className="px-3 py-2 text-center text-sm font-semibold">
        {carts.title}
      </td>

      {/* Description */}
      <td className="px-3 py-2 text-center max-w-[200px]">
        <p className="line-clamp-2 text-xs text-gray-600">
          {carts.description}
        </p>
      </td>

      {/* Category */}
      <td className="px-3 py-2 text-center text-xs">
        {carts.category}
      </td>

      {/* Price */}
      <td className="px-3 py-2 text-center font-bold text-green-600">
        ₹{carts.price}
      </td>

      {/* Rating */}
      <td className="px-3 py-2 text-center text-xs">
        ⭐ {carts?.rating}
      </td>

      {/* Qty */}
      <td className="px-3 py-2 text-center">
        <div className="flex justify-center items-center gap-2">

          <button
            disabled={carts.quantity === 1}
            onClick={handleQuantityDecreased}
            className="text-red-500 text-lg disabled:opacity-30"
          >
            <AiTwotoneMinusCircle />
          </button>

          <span className="font-bold text-sm">
            {carts.quantity}
          </span>

          <button
            onClick={handleQuantityAdd}
            className="text-green-600 text-lg"
          >
            <LuCirclePlus />
          </button>

        </div>
      </td>

      {/* Remove */}
      <td className="px-3 py-2 text-center">
        {confirm ? (
          <div className="flex gap-1 justify-center">
            <button onClick={() => setConfirm(false)} className="text-xs">NO</button>
            <button onClick={handleRemove} className="text-xs text-red-600">YES</button>
          </div>
        ) : (
          <button
            onClick={() => setConfirm(true)}
            className="text-xs text-red-500"
          >
            Delete
          </button>
        )}
      </td>

    </tr>
  );
};

export default CartItems;