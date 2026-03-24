 import React, { useContext } from "react";
 import CheckOutItems from "./CheckOutItems";
import CheckOutAddress from "./checkOutAddress";
import { TodoContext } from "../../context/Context";
   
const CheckOut = () => {
  const { cartState } = useContext(TodoContext);

  const totalAmount = cartState.cart.reduce(
    (total, items) => total + items.price * items.quantity,
    0
  );
  const totalText=totalAmount*0.18;
  const total=totalText+totalAmount;

  return (
    <div className="mt-0 px-4 max-w-[1300px] mx-auto pb-20">

      <h1 className="text-3xl font-black text-gray-900 mb-8">
        Checkout{" "}
        <span className="text-blue-600">
          ({cartState.cart.length})
        </span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* 🔥 LEFT - ADDRESS FORM */}
        <div className="w-full lg:w-[45%]">
          <CheckOutAddress totalAmount={totalAmount} />
        </div>

        {/* 🔥 RIGHT - ITEMS */}
        <div className="flex-1 w-full bg-white shadow-xl rounded-3xl border border-gray-100 overflow-hidden">

          <div className="max-h-[500px] overflow-y-auto overflow-x-hidden">

            <table className="w-full table-fixed">

              <thead className="sticky top-0 z-20 bg-gray-50 border-b">
                <tr className="text-gray-500 text-xs uppercase font-bold">
                  <th className="px-3 py-3 w-16">Product</th>
                  <th className="px-3 py-3 w-28">Title</th>
                  <th className="px-3 py-3 w-28">category</th>
                  <th className="px-3 py-3 w-20">Price</th>
                  <th className="px-3 py-3 w-20">Paid</th>
                  <th className="px-3 py-3 w-16">Qty</th>
                </tr>
              </thead>

              <tbody>
                {cartState.cart.length > 0 ? (
                  cartState.cart.map((item) => (
                    <CheckOutItems key={item.id} checkOutData={item} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-20 text-center text-gray-400">
                      No checkout items... 🛍️
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          {/* 🔥 TOTAL SECTION */}
          <div className="border-t p-4 flex justify-between items-center bg-gray-50">
            <span className="text-gray-600 font-semibold">Total Amount</span>
            <span className="text-xl font-black text-green-600">
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;