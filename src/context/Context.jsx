import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, productReducer } from "../reducer/product/ProductReducer";
import { cartInitialState, cartReducer } from "../reducer/cart/CartReducer";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [productState, productDispatch] = useReducer(productReducer, initialState)
  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(false)
  const [logout, setLogout] = useState(()=>{
    const savelogout=localStorage.getItem('logout');
    return savelogout?JSON.parse(savelogout):false;
  });
  const [login, setLogin] = useState({ email: "", password: "" });


  // render Products fetch form the api 
  const renderProduct = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://fakestoreapiserver.reactbd.org/api/products');
      productDispatch({
        type: 'SET_DATA',
        payload: response.data
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);

    } catch (error) {
      setLoading(false)
      productDispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }

  // localstorage

  useEffect(() => {
    const localData = localStorage.getItem("product");

    if (localData) {
      productDispatch({
        type: "SET_DATA",
        payload: { data: JSON.parse(localData) }
      });
    } else {
      renderProduct();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState.cart));
  }, [cartState.cart]);

  useEffect(() => {
    localStorage.setItem('product', JSON.stringify(productState.product));
  }, [productState.product])

    useEffect(() => {
    localStorage.setItem('logout', JSON.stringify(logout));
  }, [logout])


   const loginUser = (login) => {
  const data = localStorage.getItem("signup");
  const allUsers = JSON.parse(data) || [];
  const usersArray = Array.isArray(allUsers) ? allUsers : [allUsers];

 

  const userFound = usersArray.find(
    (u) => 
      u.email.trim().toLowerCase() === login.email.trim().toLowerCase() && 
      u.password === login.password
  );

  if (userFound) {
    localStorage.setItem("login", JSON.stringify(userFound));
    setLogout(true);
     return { success: true }; 
  } else {
    return { success: false, message: 'Invalid credentials. Please try again.' };
  }
};

  return (
    <TodoContext.Provider
      value={{
        category, setCategory, loginUser, login, setLogin, logout, setLogout,
        loading, setLoading, productState, productDispatch, cartState, cartDispatch, search, setSearch
      }}>
      {children}
    </TodoContext.Provider>
  )
}