import { CartContext } from "./cartContext";
import { UserAuthContext } from "../userAuth/userAuthContext";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { checkTokenValidity } from "../../utils/authUtils";

export const CartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const { userObject, isLoggedIn, authTokens } = useContext(UserAuthContext);

  const fetchCartData = async () => {
    setIsCartLoading(true);
    if (!isLoggedIn) {
      setCartData([]);
    } else {
      const isValid = await checkTokenValidity();
      if (isValid) {
        const url = `${process.env.REACT_APP_BACKEND_SERVER}/cart/`;
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
          setCartId(data.cart_id);
          setIsCartLoading(false);
        }
      } else {
        setIsCartLoading(false);
      }
    }
  };

  const addProductToCart = async (username, email, prod_id) => {
    try {
      const isValid = await checkTokenValidity();
      if (isValid) {
        const url = `${process.env.REACT_APP_BACKEND_SERVER}/cart/add/`;
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
      const isValid = await checkTokenValidity();
      if (isValid) {
        const url = `${process.env.REACT_APP_BACKEND_SERVER}/cart/remove/`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },

          body: JSON.stringify({ cartItem_id }),
        });

        if (res.ok) {
          fetchCartData();
        }
      }
    } catch (e) {
      console.log("Error in deleting item");
    }
  };

  const updateProductQuantity = async (cartItem_id, cart_id, quantity) => {
    const isValid = await checkTokenValidity();
    if (isValid) {
      try {
        const url = `${process.env.REACT_APP_BACKEND_SERVER}/cart/update/`;
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
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    } else {
      throw new Error("Tokens are not valid");
    }
  };

  useEffect(() => {
    if (userObject?.username && userObject?.email) {
      fetchCartData();
    }
  }, [userObject?.username, userObject?.email]);

  const cartTotal = cartData.reduce((total, cartItem) => {
    const productPrice = parseFloat(cartItem.product.prod_price);
    const quantity = cartItem.quantity;
    return total + productPrice * quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        fetchCartData,
        addProductToCart,
        removeProductFromCart,
        updateProductQuantity,
        isCartLoading,
        cartTotal,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
