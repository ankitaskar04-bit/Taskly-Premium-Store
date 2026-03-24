import { createBrowserRouter } from "react-router";
import Cart from "./pages/cart/Cart";
 import App from "./App";
import CheckOut from "./pages/checkout/CheckOut";
import Payment from "./pages/payment/Payment";
import Login from "./components/Login";
import Signup from "./components/Signup";
 import Orders from "./pages/orders/Orders";
import Product from "./pages/product/Product";
import Details from "./pages/details/Details";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Product/> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element:<CheckOut /> },
      { path: '/payment', element:<Payment /> },
      { path: '/orders', element: <Orders />  },
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
      { path: '/productDetails/:id', element: <Details/> },

    ]
  }
])
