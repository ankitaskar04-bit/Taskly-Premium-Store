import React, { useContext, useState } from "react";
 import { useNavigate } from "react-router";
import { VscCheck } from "react-icons/vsc";
import { TodoContext } from "../../context/Context";



const ProductCart = ({ data }) => {
  const { cartDispatch, productDispatch } = useContext(TodoContext);
  const [success, setSuccess] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  // 📝 Edit logic 
  const [editData, setEditData] = useState({ ...data });

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // ✅ 1. ADD TO CART FUNCTION
  const handleAdd = (e) => {
    e.stopPropagation();  
    cartDispatch({ type: 'ADD_TO_CART', payload: data });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 600);
  };

  // ✅ 2. UPDATE PRODUCT FUNCTION
  const handleUpdate = (e) => {
    e.stopPropagation();
    productDispatch({ type: 'EDIT_PRODUCT', payload: editData });
    setEdit(false);
  };

  // ✅ 3. EDIT MODE FUNCTION
  const handleEdit = (e) => {
    e.stopPropagation();
    setEdit(true);
  };

  return (
    <tr
      className="group h-24 border-b border-white/5 bg-transparent hover:bg-white/[0.04] transition-all duration-500 cursor-pointer"
      onClick={() => navigate(`/productDetails/${data._id || data.id}`)}
    >
      {/* 🖼️ IMAGE */}
      <td className="px-4 py-3 text-center">
        <img className="w-14 h-14 object-cover rounded-xl bg-white p-1" src={data.image} alt={data.title} />
      </td>

      {/* 📝 TITLE */}
      <td className="px-4 py-3 text-left">
        {edit ? (
          <input
            name="title" value={editData.title} onChange={handleEditChange} onClick={(e) => e.stopPropagation()}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-green-400 outline-none"
          />
        ) : (
          <p className="text-sm font-black text-gray-200 truncate max-w-[150px]">{editData.title}</p>
        )}
      </td>

      {/* 📄 DESCRIPTION (Line Clamp fixed) */}
      <td className="px-4 py-3 max-w-[200px]">
        <p className="line-clamp-2 text-[11px] text-gray-500 leading-relaxed group-hover:text-gray-400">
          {editData.description}
        </p>
      </td>

      {/* 🏷️ CATEGORY */}
      <td className="px-4 py-3 text-center">
           {edit ? (
          <input
            name="category" value={editData.category} onChange={handleEditChange} onClick={(e) => e.stopPropagation()}
            className="w-full text-center bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-green-400 outline-none"
          />
        ) : (
          <p className="text-sm font-black text-gray-200 truncate max-w-[150px]">{editData.category}</p>
        )}
      </td>

      {/* 💰 PRICE */}
      <td className="px-4 py-3 text-center">
     {edit ? (
          <input
            name="price" value={editData.price} onChange={handleEditChange} onClick={(e) => e.stopPropagation()}
            className="w-full text-center bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-green-400 outline-none"
          />
        ) : (
          <p className="text-sm font-black text-gray-200 truncate max-w-[150px]">{editData.price}</p>
        )}
       </td>

      {/* ⭐ RATING */}
      <td className="px-4 py-3 text-center text-[11px] font-black text-gray-300">
        ⭐ {editData?.rating}
      </td>

      {/* 🚀 ACTION CONTROLS (With StopPropagation) */}
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center gap-3">
          <button
            className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl border transition-all ${edit ? 'bg-blue-600 text-white border-blue-400' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-blue-600 hover:text-white'
              }`}
            onClick={(e) => edit ? handleUpdate(e) : handleEdit(e)}
          >
            {edit ? 'Update' : 'Edit'}
          </button>

          <button
            className="px-4 py-2 bg-green-500/10 border border-green-500/20 text-[10px] font-black text-green-500 rounded-xl hover:bg-green-500 hover:text-black transition-all"
            onClick={handleAdd}
          >
            {success ? <VscCheck className="mx-auto" /> : 'Add'}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductCart;