import React, { useContext, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartContext } from "../context/cart/cartContext";

const CartCard = ({ cartItem }) => {
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const {
    fetchCartData,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
  } = useContext(CartContext);

  const handleRemoveProductFromCart = () => {
    removeProductFromCart(cartItem.id);
  };

  const handleDecreaseQuantity = () => {
    if (cartItem.quantity > 1) {
      updateProductQuantity(cartItem.id, cartItem.cart, quantity - 1);
      setQuantity(quantity - 1);
    } else {
      handleRemoveProductFromCart();
    }
  };

  const handleIncreaseQuantity = () => {
    updateProductQuantity(cartItem.id, cartItem.cart, quantity + 1);
    setQuantity(quantity + 1);
  };

  console.log(cartItem);
  return (
    <div className="m-2 bg-white border md:h-28 shadow-lg rounded-md flex gap-4 relative">
      <div className="flex flex-1 flex-col justify-center items-center h-full">
        <img
          src={cartItem.product.prod_image_url}
          alt=""
          className="object-cover h-max w-max"
        />
      </div>
      <div className="md:p-4 flex-grow flex flex-2 flex-col md:flex-row ">
        <div className="flex justify-center gap-1 md:gap-4">
          <div className="text-sm font-semibold md:text-base md:font-bold">
            {cartItem.product.prod_title}
          </div>
          <div className="hidden md:flex text-sm text-gray-600">
            {cartItem.product.prod_desc}
          </div>
        </div>

        <div className="flex flex-col gap-1 md:flex-row md:gap-10 items-center">
          <div className="flex justify-center items-center gap-5">

            <div className="flex gap-2 md:gap-4 items-center justify-center">
              <Minus
                className="visible"
                size={18}
                color="grey"
                onClick={handleDecreaseQuantity}
              />
              <div className="font-bold text-sm md:text-xl">{quantity}</div>
              <Plus size={18} color="grey" onClick={handleIncreaseQuantity} />
            </div>

            <div className="font-bold text-lg md:text-xl flex-grow text-right">
              ₹ {cartItem.product.prod_price * cartItem.quantity}
            </div>
          </div>

          <div className="h-8 w-full flex items-center justify-center md:h-12 md:w-12 bg-gray-100 rounded-lg">
            <Trash2
              className="h-5 md:h-15 w-5 md:w-15"
              onClick={handleRemoveProductFromCart}
              color="#800000"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
