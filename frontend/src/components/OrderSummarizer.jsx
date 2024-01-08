import React, { useContext, useEffect, useState } from 'react'
import Button from "../components/Button";
import { CartContext } from '../context/cart/cartContext';

const OrderSummarizer = () => {

  const{cartData} = useContext(CartContext);

  const [convenienceFee, setConvenienceFee] = useState(150);

  const  cartTotal = cartData.reduce((total, cartItem) => {
    const productPrice = parseFloat(cartItem.product.prod_price);
    const quantity = cartItem.quantity;
    return total + productPrice * quantity;
  }, 0);

  useEffect(() => {
   
    if (cartTotal > 1000) {
      setConvenienceFee(0);
    } else {
      
      setConvenienceFee(150);
    }
  }, [cartTotal]);

  
  return (
    <div className="m-2 p-3  bg-white border shadow-lg rounded-md flex flex-col items-center justify-center">
              <div className="p-2 font-bold text-sm md:text-base border-b">Order Summary</div>

              <div className="text-sm md:text-base p-1 w-full flex items-center justify-between">
                <div className="text-gray-600">Cart Total</div>
                <div className="font-bold">{cartTotal}</div>
              </div>

              <div className="text-sm md:text-base p-1 w-full flex items-center justify-between">
                <div className=" text-gray-600">Convenience Fee</div>
                <div className=" font-bold">{convenienceFee}</div>
              </div>

              <div className="text-sm md:text-base p-1 w-full flex items-center justify-between">
                <div className=" text-gray-600">Order Total</div>
                <div className=" font-bold">{convenienceFee + cartTotal}</div>
              </div>

              <Button  type="submit">Confirm Order</Button>

            </div>
  )
}

export default OrderSummarizer