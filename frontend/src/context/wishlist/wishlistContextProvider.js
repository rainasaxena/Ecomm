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
          const url = "http://127.0.0.1:8000/wishlist/";
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
            console.log("Wishlist Data: ", data.cartData);
          }
        }
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    }
  };

  const addProductToWishlist = async (username, email, prod_id) => {
    try {
      const isValid = await checkTokenValidity();
      if (isValid) {
        const url = "http://127.0.0.1:8000/wishlist/add/";
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
          console.log("Items added to wishlist");
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
        const url = "http://127.0.0.1:8000/wishlist/remove/";

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
