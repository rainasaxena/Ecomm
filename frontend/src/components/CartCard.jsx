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

  console.log(cartItem)
  return (
    <div className="m-2 bg-white border h-28 md:h-52 shadow-lg rounded-md flex gap-4 relative">
      <img src={cartItem.product.prod_image_url} alt="" />
      <div className="flex flex-col justify-center gap-1 md:gap-4">
        <div className="text-sm md:text-base font-bold">
          {cartItem.product.prod_title}
        </div>
        <div className="invisible md:visible text-sm text-gray-600">
          {cartItem.product.prod_desc}
        </div>
        <div className="text-sm m-1 h-6 md:h-8 w-2 md:w-40 bg-slate-300 rounded-md p-1 flex gap-2 items-center justify-center">
          <div className="invisible md:visible">Quantity:</div>
          <Minus
            className="visible"
            size={18}
            onClick={handleDecreaseQuantity}
          />
          <div className="font-bold text-sm">{quantity}</div>
          <Plus size={18} onClick={handleIncreaseQuantity} />
        </div>
        <div className="flex items-center justify-between">
          <div className="font-bold text-sm md:text-lg">₹ {cartItem.product.prod_price*cartItem.quantity}
          </div>
          <div className="absolute bottom-2 right-4">
            <Trash2
              className="h-5 md:h-15 w-5 md:w-15"
              onClick={handleRemoveProductFromCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
