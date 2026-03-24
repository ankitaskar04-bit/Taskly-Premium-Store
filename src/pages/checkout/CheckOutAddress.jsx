import React, { useContext, useEffect, useState } from "react";
import { checkoutSchema } from "../../zod/Zod";
 import { useNavigate } from "react-router";
import { TodoContext } from "../../context/Context";
  
const CheckOutAddress = () => {
  const [success, setSuccess] = useState(false);
  const { cartState } = useContext(TodoContext);
  const [confirm, setConfirm] = useState(false);
  const [address, setaddress] = useState({
    name: "",
    area: "",
    phone: "",
    city: "",
    pincode: "",
  });


  const [error, setError] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) {
      setaddress(JSON.parse(savedAddress));
    }
  }, []);


  const handlesave = (e) => {
    setaddress({ ...address, [e.target.name]: e.target.value });

    if (error[e.target.name]) {
      setError({ ...error, [e.target.name]: "" });
    }
  };

  const handleForm = (e) => {
    e.preventDefault();

    const result = checkoutSchema.safeParse(address);

    if (!result.success) {
      const existing = {};
      result.error.issues.forEach((item) => {
        existing[item.path[0]] = item.message;
      });
      setError(existing);
      return;
    }

    setError({});
    localStorage.setItem("userAddress", JSON.stringify(address));
    localStorage.removeItem('cart')
    localStorage.removeItem('userAddress');

    if (address) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);

      setConfirm(true);
      setTimeout(() => {
        setConfirm(false);
        navigate('/payment')
      }, 4000);
    };



  };

  const totalPrice = cartState.cart.reduce((total, items) => total + (items.price * items.quantity), 0);
  const textAmount = totalPrice * 0.18;
  const total = totalPrice + textAmount;

  return (
 
<div className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm group/form">
  
  {/* Header Section */}
  <div className="flex items-center gap-3 mb-5 border-b pb-3 border-gray-50">
    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
      <span className="text-lg">📍</span>
    </div>
    <div>
      <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-900">Shipping Details</h2>
      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">Delivery Information</p>
    </div>
  </div>

 
  <form onSubmit={handleForm} className="space-y-1">
    
    {/* FULL NAME */}
    <div className="space-y-1">
      <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Name</label>
      <input 
        type="text" 
        name="name"
        value={address.name}
        placeholder="Full Name"
        onChange={handlesave}
        className={`w-full bg-gray-50/50 border ${error.name ? 'border-red-500' : 'border-gray-100'} p-2.5 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-blue-400 transition-all`}
      />
      {error.name && <p className="text-[9px] text-red-500 font-bold ml-1">{error.name}</p>}
    </div>

    {/* AREA */}
    <div className="space-y-1">
      <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Area</label>
      <input 
        type="text" 
        name="area"
        value={address.area}
        placeholder="Street / Area"
        onChange={handlesave}
        className={`w-full bg-gray-50/50 border ${error.area ? 'border-red-500' : 'border-gray-100'} p-2.5 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-blue-400 transition-all`}
      />
      {error.area && <p className="text-[9px] text-red-500 font-bold ml-1">{error.area}</p>}
    </div>

    {/* PHONE*/}
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone</label>
        <input 
          type="text" 
          name="phone"
          value={address.phone}
          placeholder="Phone"
          onChange={handlesave}
          className={`w-full bg-gray-50/50 border ${error.phone ? 'border-red-500' : 'border-gray-100'} p-2.5 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-blue-400 transition-all`}
        />
        {error.phone && <p className="text-[9px] text-red-500 font-bold ml-1">{error.phone}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">City</label>
        <input 
          type="text" 
          name="city"
          value={address.city}
          placeholder="City"
          onChange={handlesave}
          className={`w-full bg-gray-50/50 border ${error.city ? 'border-red-500' : 'border-gray-100'} p-2.5 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-blue-400 transition-all`}
        />
        {error.city && <p className="text-[9px] text-red-500 font-bold ml-1">{error.city}</p>}
      </div>
    </div>

    {/* PINCODE */}
    <div className="space-y-1">
      <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Pincode</label>
      <input 
        type="text" 
        name="pincode"
        value={address.pincode}
        placeholder="Pincode"
        onChange={handlesave}
        className={`w-full bg-gray-50/50 border ${error.pincode ? 'border-red-500' : 'border-gray-100'} p-2.5 rounded-xl text-xs font-medium outline-none focus:bg-white focus:border-blue-400 transition-all`}
      />
      {error.pincode && <p className="text-[9px] text-red-500 font-bold ml-1">{error.pincode}</p>}
    </div>

    {/* TOTAL DISPLAY */}
    <div className="border-t border-dashed border-gray-100 pt-3 flex justify-between items-center">
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Payable</span>
      <span className="text-sm font-black text-green-600">₹{total.toFixed(2)}</span>
    </div>

    {/* SUBMIT BUTTON WITH STATES */}
    <button 
      type="submit" 
      disabled={success || confirm} 
      className={`w-full h-12 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 
        ${success ? 'bg-green-600' : confirm ? 'bg-cyan-900 scale-105 shadow-lg' : 'bg-gray-900 hover:bg-blue-600'} 
        text-white flex items-center justify-center gap-2`}
    >
      {success ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
      ) : confirm ? (
        "Order Confirmed ✓"
      ) : (
        "Place Order 💳"
      )}
    </button>

  </form>
</div>
  );
};

export default CheckOutAddress;