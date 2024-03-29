import { Heart, ShoppingCart } from "lucide-react";
import React, { useContext, useState } from "react";
import { UserAuthContext } from "../context/userAuth/userAuthContext";
import { WishlistContext } from "../context/wishlist/wishlistContext";
import { CartContext } from "../context/cart/cartContext";
import ProductModal from "../pages/ProductModal";
import toast, { Toaster } from "react-hot-toast";

const Card = ({
  prod_id,
  prod_image_url,
  prod_title,
  prod_price,
  prod_old_price,
  prod_desc,
}) => {
  const { userObject, isLoggedIn } = useContext(UserAuthContext);
  const { addProductToWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
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

  const notifyProductAddedToWishlist = () =>
    toast("Product added to wishlist!", {
      icon: "❤️",
    });

  const handleCartClick = () => {
    if (isLoggedIn === false) {
      notifyLogin();
    } else {
      addProductToCart(userObject.username, userObject.email, prod_id);
      notifyProductAdded();
    }
  };

  const handleWishClick = () => {
    if (isLoggedIn === false) {
      notifyLogin();
    } else {
      addProductToWishlist(userObject.username, userObject.email, prod_id);
      notifyProductAddedToWishlist();
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <ProductModal
        prod_id={prod_id}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="shadow-md w-36 md:w-72 mb-2 rounded-md overflow-hidden border">
        <div className="p-2">
          <div className="" onClick={() => setIsOpen(true)}>
            <div className="relative md:static">
              <div className="absolute top-1 right-1 flex gap-1 md:invisible">
                <div className="bg-white rounded-full p-1 opacity-80">
                  <Heart
                    className="visible md:hidden"
                    size={18}
                    color="black"
                    onClick={handleWishClick}
                  />
                </div>
                <div className="bg-white rounded-full p-1 opacity-80">
                  <ShoppingCart
                    className="visible md:hidden"
                    size={18}
                    color="black"
                    onClick={handleCartClick}
                  />
                </div>
              </div>
              <img
                className="h-28 md:h-56 w-full rounded-sm object-cover"
                src={prod_image_url}
                alt="Card Image"
              />
            </div>
          </div>
        </div>
        <div className="p-2 md:p-4">
          <div className="flex items-center justify-between">
            <p className="text-[12px] md:text-[18px] text-gray-600 font-bold">
              {prod_title}
            </p>
            <div className="flex gap-2">
              <Heart
                className="invisible md:visible cursor-pointer "
                size={25}
                onClick={handleWishClick}
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
              ₹{prod_price}
            </p>
            <p className="text-[10px] md:text-[16px] text-gray-950 font-bold ">
              <s>₹{prod_old_price}</s>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
