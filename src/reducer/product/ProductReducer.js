
const getStoredCart = () => {
  const productsaved = localStorage.getItem('product');
  return productsaved ? JSON.parse(productsaved) : [];
}
export const initialState = {
  product:getStoredCart(),
};

const actions = {
  SET_DATA: (state, action) => ({
    ...state,
    product: action.payload.data,
    totalItems: action.payload.length
  }),

  EDIT_PRODUCT: (state, action) => ({
    ...state,
    product: state.product.map((p) => p._id === action.payload._id ? action.payload : p)
  }),
}



export const productReducer = (state, action) => {
  const executeAction = actions[action.type];
  return executeAction ? executeAction(state, action) : state;
}