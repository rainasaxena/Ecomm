import React, { useContext } from "react";
import Modal from "../components/Modal";
import { ProductContext } from "../context/products/productContext";
import Button from "../components/Button";
import { Heart, ShoppingCart } from "lucide-react";
import { WishlistContext } from "../context/wishlist/wishlistContext";
import { CartContext } from "../context/cart/cartContext";
import { UserAuthContext } from "../context/userAuth/userAuthContext";
import toast, { Toaster } from "react-hot-toast";

const ProductModal = ({ isOpen, onClose, prod_id }) => {
  const { productData } = useContext(ProductContext);
  const product = productData.filter((item) => item.prod_id === prod_id)[0];

  const { addProductToWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);
  const { userObject, isLoggedIn } = useContext(UserAuthContext);

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
    <Modal open={isOpen} onClose={onClose}>
      <div className="flex gap-8 w-[800px]">
        <div className="h-[300px] w-[300px] flex-shrink-0">
          <img
            className="h-full w-full object-cover rounded-md"
            src={product.prod_image_url}
            alt=""
          />
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-5">
            <p className="text-2xl text-black font-bold">
              {product.prod_title}
            </p>
            <p className="text-lg text-gray-600 ">{product.prod_desc}</p>
            <p className="text-lg text-gray-600 font-bold">
              {product.prod_specs}
            </p>

            <div className="flex gap-2">
              <p className="text-lg text-black font-bold">
                ₹{product.prod_price}
              </p>

              <p className="text-lg text-black font-bold">
                <s>₹{product.prod_old_price}</s>
              </p>
            </div>
          </div>

          <div className="">
            <div className="flex gap-2">
              <Button onClickFunction={handleWishClick}>
                <div className="flex items-center justify-center">
                  <Heart />
                </div>
                <p>Add to Wishlist</p>
              </Button>
              <Button onClickFunction={handleCartClick}>
                <ShoppingCart />
                <p>Add to Cart</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
