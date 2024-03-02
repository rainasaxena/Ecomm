import { Heart, ShoppingCart, Trash2Icon } from "lucide-react";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../context/cart/cartContext";
import { UserAuthContext } from "../context/userAuth/userAuthContext";
import { WishlistContext } from "../context/wishlist/wishlistContext";

const WishlistCard = ({
  prod_id,
  prod_image_url,
  prod_title,
  prod_price,
  prod_old_price,
  prod_desc,
}) => {
  const { userObject, isLoggedIn } = useContext(UserAuthContext);
  const { addProductToCart } = useContext(CartContext);
  const { removeProductFromWishlist } = useContext(WishlistContext);

  const notifyLogin = () =>
    toast(
      "You are not logged in!\n Please login or signup to continue shopping!",
      {
        icon: "🔒",
      }
    );

  const notifyProductAdded = () =>
    toast("Product added to cart!", {
      icon: "🛍️",
    });

  const notifyProductRemoved = () =>
    toast("Product removed from wishlist!", {
      icon: "🗑️",
    });

  const handleRemoveFromWishlist = () => {
    if (isLoggedIn === false) {
      notifyLogin();
    } else {
      try {
        removeProductFromWishlist(
          userObject.username,
          userObject.email,
          prod_id
        );
      } catch (err) {
        console.log(err);
      } finally {
        notifyProductRemoved();
      }
    }
  };

  const handleCartClick = () => {
    if (isLoggedIn === false) {
      notifyLogin();
    } else {
      addProductToCart(userObject.username, userObject.email, prod_id);
      removeProductFromWishlist(userObject.username, userObject.email, prod_id);
      notifyProductAdded();
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <div className="w-36 md:w-72 m-2 rounded-md overflow-hidden border">
        <div className="p-1">
          <div
            className=""
            //   onClick={() => setIsOpen(true)}
          >
            <img
              className="h-28 md:h-56 w-full rounded-sm object-cover"
              src={prod_image_url}
              alt="Wishlist Card Image"
            />
            <div className="absolute top-1 right-1 flex gap-1">
              <div className="bg-white rounded-full p-1 opacity-80 md:invisible">
                <Trash2Icon
                  className=" visible md:invisible"
                  size={18}
                  color="black"
                  onClick={handleRemoveFromWishlist}
                />
              </div>
              <div className="bg-white rounded-full p-1 opacity-80 md:invisible">
                <ShoppingCart
                  className="visible md:invisible"
                  size={18}
                  color="black"
                  onClick={handleCartClick}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 md:p-4">
          <div className="flex items-center justify-between">
            <p className="text-[12px] md:text-[18px] text-gray-600 font-bold">
              {prod_title}
            </p>
            <div className="flex gap-2">
              <Trash2Icon
                className="invisible md:visible cursor-pointer"
                size={25}
                onClick={handleRemoveFromWishlist}
              />
              <ShoppingCart
                className="invisible md:visible cursor-pointer"
                size={25}
                onClick={handleCartClick}
              />
            </div>
          </div>
          <p className="text-[10px] md:text-[16px] text-gray-500 ">
            {prod_desc}
          </p>
          <div className="flex gap-2">
            <p className="text-[10px] md:text-[16px] text-gray-950 font-bold ">
              ₹ {prod_price}
            </p>
            <p className="text-[10px] md:text-[16px] text-gray-950 font-bold ">
              <s>₹ {prod_old_price}</s>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistCard;
