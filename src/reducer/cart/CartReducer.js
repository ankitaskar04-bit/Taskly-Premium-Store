const getStoredCart=()=>{
  const cartItems=localStorage.getItem('cart');
  return cartItems?JSON.parse(cartItems):[];
}
const getStoredOrders=()=>{
  const orderItems=localStorage.getItem('orders');
  return orderItems?JSON.parse(orderItems):[];
}

export const cartInitialState={
  cart:getStoredCart(),
  orders:getStoredOrders(),
  quantity:0
}

const cartActions={
  ADD_TO_CART:(state,action)=>{
    const existing=state.cart.find((p)=>p._id===action.payload._id);
    if (existing) {
      return{
        ...state,
        cart:state.cart.map((p)=>p._id===action.payload._id?{...p,quantity:p.quantity+1}:p)
      }
    }
      return{
        ...state,
        cart:[...state.cart,{...action.payload,quantity: 1}]
      }

  },

  REMOVE_ITEM:(state,action)=>({
    ...state,
    cart:state.cart.filter((p)=>p._id!==action.payload._id)
  }),
  QUANTITY_DECREASED:(state,action)=>{
    const existing=state.cart.find((p)=>p._id===action.payload._id);
    if (existing&&existing.quantity>1) {
      return{
        ...state,
        cart:state.cart.map((p)=>p._id===action.payload._id?{...p,quantity:p.quantity-1}:p)
      }
    }
  },

  CLEAR_CART:(state)=>{
    return({
        ...state,
    cart:[]
    })
  },

  ORDER_ITEMS:(state,action)=>{
    const NewOrders={
      id:Date.now(),
      items:state.cart,
      address:action.payload.address,
      total:action.payload.total,
      date:new Date().toLocaleString()
    }

    const updateOrders=[NewOrders,...state.orders];
    localStorage.setItem('orders', JSON.stringify(updateOrders));
    return({
      ...state,
      orders:updateOrders
    });

  }

}

export const cartReducer=(state,action)=>{
  const execute=cartActions[action.type]
  return execute?execute(state,action):state
}
