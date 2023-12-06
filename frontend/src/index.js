import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./components/Navbar";
import { CategoryContextProvider } from "./context/category/categoryContextProvider";
import { ProductContextProvider } from "./context/products/productContextProvider";
import { UserAuthContextProvider } from "./context/userAuth/userAuthContextProvider";
import { CartContextProvider } from "./context/cart/cartContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <CategoryContextProvider>
        <CartContextProvider>
          <ProductContextProvider>
            <BrowserRouter>
              <Navbar />
              <App />
            </BrowserRouter>
          </ProductContextProvider>
        </CartContextProvider>
      </CategoryContextProvider>
    </UserAuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
