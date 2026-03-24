import React, { useContext } from "react";
  import ProductCart from "./ProductCart";  
import { TodoContext } from "../../context/Context";
const Product = () => {
  const { productState, search, loading, category } = useContext(TodoContext);
  const filteredData = productState.product.filter((p) => {
    if (!p || !p.title) return null;
    const searchItem = p.title?.toLowerCase().includes(search.toLowerCase());
    const categoryItem = category === 'All' || p.category === category;
    return searchItem && categoryItem;
  });


  return (
    <div className="max-w-7xl mx-auto mt-20 mb-10 bg-[#152b31]/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 rounded-[30px] overflow-hidden">

      {/* ✅ SCROLLABLE BODY AREA */}
      {/* Description: Custom scrollbar styling and fixed height for vertical-only data scrolling */}
      <div className="max-h-[550px] overflow-y-auto overflow-x-hidden 
    scrollbar-thin scrollbar-thumb-green-500/20 scrollbar-track-transparent">

        <table className="w-full table-fixed border-collapse">

          {/* --- STICKY HEADER --- */}
          {/* Description: Remains fixed at the top while data scrolls underneath */}
          <thead className="sticky top-[0px] z-30 bg-[#152b31] border-b border-white/10 shadow-xl">
            <tr className="text-gray-400 text-[10px] uppercase font-black tracking-[0.2em]">
              <th className="px-4 py-5 w-20 text-center">Preview</th>
              <th className="px-4 py-5 w-40 text-left">Product Title</th>
              <th className="px-4 py-5 w-52 text-center text-left">Description</th>
              <th className="px-4 py-5 w-32 text-center">Category</th>
              <th className="px-4 py-5 w-24 text-center">Price</th>
              <th className="px-4 py-5 w-24 text-center">Rating</th>
              <th className="px-4 py-5 w-40 text-center">Action Control</th>
            </tr>
          </thead>

          {/* --- TABLE BODY --- */}
          {/* Description: Dynamic rendering of products with Loading and No-Data states */}
          <tbody className="divide-y divide-white/5">

            {loading ? (
              /* --- LOADING STATE --- */
              <tr>
                <td colSpan="7" className="py-32 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-12 w-12">
                      <div className="absolute inset-0 rounded-full border-4 border-green-500/20"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-t-green-500 animate-spin"></div>
                    </div>
                    <p className="text-green-500/50 text-[10px] font-black uppercase tracking-widest animate-pulse">
                      Syncing Database...
                    </p>
                  </div>
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              /* --- PRODUCT DATA LIST --- */
              filteredData.map((item) => (
                <ProductCart key={item._id} data={item} />
                ))
            ) : (
              /* --- EMPTY SEARCH STATE --- */
              <tr>
                <td colSpan="7" className="py-32 text-center">
                  <div className="flex flex-col items-center group">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0">🛰️</div>
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">
                      No Signals Found
                    </h3>
                    <p className="text-[10px] text-gray-600 mt-2">Try adjusting your search filters</p>
                  </div>
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>

  );
};

export default Product;