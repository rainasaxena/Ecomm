import { CartContext } from "./cartContext";
import { UserAuthContext } from "../userAuth/userAuthContext";
import React, { useState } from "react";
import { useContext } from "react";
import { checkTokenValidity } from "../../utils/authUtils";

export const CartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const { userObject, isLoggedIn, authTokens } = useContext(UserAuthContext);

  const fetchCartData = async () => {
    console.log(userObject);
    if (!isLoggedIn) {
      setCartData([]);
    } else {
      const isValid = await checkTokenValidity();
      if (isValid) {
        const url = "http://127.0.0.1:8000/cart/";
        const res = await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
          body: JSON.stringify({
            username: userObject.username,
            email: userObject.email,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setCartData(data.cartData);
        }
      }
    }
  };

  const addProductToCart = async (username, email, prod_id) => {
    try {
      const isValid = checkTokenValidity();
      if (isValid) {
        const url = "http://127.0.0.1:8000/cart/add/";
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },

          body: JSON.stringify({ username, email, prod_id }),
        });

        if (res.ok) {
          fetchCartData();
          console.log("Items added to cart");
        } else {
          throw new Error("Not able to add item in cart");
        }
      } else {
        throw new Error("Not Logged in ");
      }
    } catch (e) {
      console.log("Adding product to cart failed: ", e);
    }
  };

  const removeProductFromCart = async (cartItem_id) => {
    try {
      const url = "http://127.0.0.1:8000/cart/remove/";
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },

        body: JSON.stringify({ cartItem_id }),
      });

      if (res.ok) {
        fetchCartData();
        console.log("Item removed from cart");
      }
    } catch (e) {
      console.log("Error in deleting item");
    }
  };

  const updateProductQuantity = async (cartItem_id, cart_id, quantity) => {
    const isValid = await checkTokenValidity();
    if (isValid) {
      try {
        const url = "http://127.0.0.1:8000/cart/update/";
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },

          body: JSON.stringify({ cartItem_id, cart_id, quantity }),
        });

        if (res.ok) {
          fetchCartData();
          console.log("Cart Updated");
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log("Error in updating cart");
        return false;
      }
    } else {
      throw new Error("Tokens are not valid");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        fetchCartData,
        addProductToCart,
        removeProductFromCart,
        updateProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
