import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { CartContext } from "../context/cart/cartContext";
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';

const OrderSummarizer = () => {
  const { cartData, cartTotal } = useContext(CartContext);

  const [convenienceFee, setConvenienceFee] = useState(150);

  const navigate = useNavigate();
  // const history = useHistory();

  // const handleConfirmOrder = () => {
  //   navigate("/payments");
  // };

  useEffect(() => {
    if (cartTotal > 1000) {
      setConvenienceFee(0);
    } else {
      setConvenienceFee(150);
    }
  }, [cartTotal]);

  return (
    <div className="m-2 p-3  bg-white border shadow-lg rounded-md flex flex-col items-center justify-center">
      <div className="p-2 font-bold text-sm md:text-base border-b">
        Order Summary
      </div>

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

      <Button onClickFunction={()=>navigate('/payment')}>
        Confirm Order
      </Button>
      
    </div>
  );
};

export default OrderSummarizer;
