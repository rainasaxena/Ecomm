import { CartContext } from "./cartContext";
import { UserAuthContext } from "../userAuth/userAuthContext";
import React, { useState } from "react";
import { useContext } from "react";
import { checkTokenValidity } from "../../utils/authUtils";

export const CartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const { userObject, isLoggedIn, authTokens } = useContext(UserAuthContext);

  const fetchCartData = async () => {
    setIsCartLoading(true);
    if (!isLoggedIn) {
      setCartData([]);
    } else {
      const isValid = await checkTokenValidity();
      if (isValid) {
        const url = "https://ecomm-backend-v1.onrender.com/cart/";
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
          console.log("The data in the cart is: ",data.cartData );
          setIsCartLoading(false);
        }
      }else{
        setIsCartLoading(false);
      }
    }
  };

  const addProductToCart = async (username, email, prod_id) => {
    try {
      const isValid = await checkTokenValidity();
      if (isValid) {
        const url = "https://ecomm-backend-v1.onrender.com/cart/add/";
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
      const isValid = await checkTokenValidity();
      if (isValid) {
        
        const url = "https://ecomm-backend-v1.onrender.com/cart/remove/";
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
      }
    } catch (e) {
      console.log("Error in deleting item");
    }
  };

  const updateProductQuantity = async (cartItem_id, cart_id, quantity) => {
    const isValid = await checkTokenValidity();
    if (isValid) {
      try {
        const url = "https://ecomm-backend-v1.onrender.com/cart/update/";
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

  
  const  cartTotal = cartData.reduce((total, cartItem) => {
    const productPrice = parseFloat(cartItem.product.prod_price);
    const quantity = cartItem.quantity;
    return total + productPrice * quantity;
  }, 0);

  console.log("context cart total:",cartTotal);
  console.log("cart Data", cartData);


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
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
