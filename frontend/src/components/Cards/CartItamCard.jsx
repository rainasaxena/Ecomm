import React, { useContext, useState } from "react";
import { Trash } from "lucide-react";
import { CartContext } from "../../context/cart/cartContext";

const CartItamCard = ({ cartProduct, cartId }) => {
  const [quantity, setQuantity] = useState(cartProduct.quantity);
  const { removeProductFromCart, updateProductQuantity } =
    useContext(CartContext);

  const handleRemoveProductFromCart = () => {
    removeProductFromCart(cartProduct.id);
  };

  const handleDecreaseQuantity = () => {
    if (cartProduct.quantity > 1) {
      updateProductQuantity(cartProduct.id, cartProduct.cart, quantity - 1);
      setQuantity(quantity - 1);
    } else {
      handleRemoveProductFromCart();
    }
  };

  const handleIncreaseQuantity = () => {
    updateProductQuantity(cartProduct.id, cartProduct.cart, quantity + 1);
    setQuantity(quantity + 1);
  };

  return (
    <div className="w-full h-max flex mt-3 items-center md:mt-5 rounded-lg shadow-md">
      <div className="flex items-center justify-center w-max h-max p-2">
        <img
          src={cartProduct?.product?.prod_image_url}
          className="w-20 md:w-32 h-full md:h-28 object-cover rounded-lg"
          alt=""
        />
      </div>
      <div className="w-full p-2 flex my-2">
        <div className="flex flex-col w-full items-centerc justify-center">
          <div className="text-base md:text-xl font-bold">
            {cartProduct?.product?.prod_title}
          </div>
          <div className="hidden md:block text-gray-600 text-xs md:text-base ">
            {cartProduct?.product?.prod_desc}
          </div>
          <div className="flex w-full items-start mt-1 md:mt-2 divide-x divide-solid divide-gray-400">
            <div className="text-gray-600 font-bold text-sm md:text-base">
              {cartProduct?.product?.prod_price}
            </div>
            <button
              className="flex gap-1 mx-2 items-center justify-center cursor-pointer"
              onClick={handleRemoveProductFromCart}
            >
              <Trash size={20} className="text-red-400 ml-2" />
              <p className="text-red-400 text-xs md:text-sm">Remove</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col w-max rounded-lg items-center justify-center gap-1">
          <button
            className="text-gray-600 flex flex-1 items-center justify-center font-bold px-4 py-1 text-xs md:text-base bg-gray-100 rounded-md"
            onClick={handleIncreaseQuantity}
          >
            +
          </button>
          <div className="text-gray-600 flex flex-1 items-center justify-center font-bold px-4 py-1 text-xs md:text-base rounded-md">
            {quantity}
          </div>
          <button
            className="text-gray-600 flex flex-1 items-center justify-center font-bold px-4 py-1 text-xs md:text-base bg-gray-100 rounded-md"
            onClick={handleDecreaseQuantity}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItamCard;
