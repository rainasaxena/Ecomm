import { UserAuthContext } from "../userAuth/userAuthContext";
import React, { useState } from "react";
import { useContext } from "react";
import { WishlistContext } from "./wishlistContext";
import { checkTokenValidity } from "../../utils/authUtils";

export const WishlistContextProvider = ({ children }) => {
  const [wishlistData, setWishlistData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userObject, isLoggedIn, authTokens } = useContext(UserAuthContext);

  const fetchWishlistData = async (username, email) => {
    setIsLoading(true);
    if (!isLoggedIn) {
      setWishlistData([]);
          } else {
      try {
        const isValid = await checkTokenValidity();
        if (isValid) {
          const url = `${process.env.REACT_APP_BACKEND_SERVER}/wishlist/`;
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access}`,
            },

            body: JSON.stringify({
              username: username,
              email: email,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            setWishlistData(data.cartData.products);
            setIsLoading(false);
          }
        }
      } catch (e) {
        setIsLoading(false);
      }
    }
  };

  const addProductToWishlist = async (username, email, prod_id) => {
    try {
      const isValid = await checkTokenValidity();
      if (isValid) {
        const url = `${process.env.REACT_APP_BACKEND_SERVER}/wishlist/add/`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },

          body: JSON.stringify({ username, email, prod_id }),
        });

        if (res.ok) {
          fetchWishlistData(username, email);
        } else {
          throw new Error("Not able to add item in wishlist");
        }
      } else {
        throw new Error("Not Logged in ");
      }
    } catch (e) {
      console.log("Adding product to wishlist failed: ", e);
    }
  };

  const removeProductFromWishlist = async (username, email, prod_id) => {
    try {
      const isValid = await checkTokenValidity();
      if (isValid) {
        const url = `${process.env.REACT_APP_BACKEND_SERVER}/wishlist/remove/`;

        const res = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },

          body: JSON.stringify({ username, email, prod_id }),
        });

        if (res.ok) {
          fetchWishlistData(username, email);
        }
      }
    } catch (e) {
      console.log("Error in deleting item");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistData,
        removeProductFromWishlist,
        fetchWishlistData,
        addProductToWishlist,
        isLoading
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
