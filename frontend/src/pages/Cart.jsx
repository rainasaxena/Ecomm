import React from "react";
import Container from "../components/Container";

import CartCard from "../components/CartCard";
import OrderSummarizer from "../components/OrderSummarizer";

const Cart = () => {
  return (
    <>
      <Container>
        <div className="p-5 text-sm md:text-base font-bold text-center border-b ">
          Your Cart
        </div>
        <div className="mt-2 flex flex-col md:flex-row  items-center justify-center gap-5 ">
          <div className="w-full border-r">
            <CartCard />
            <CartCard />
          </div>

          <div className="w-full md:w-1/2">
            <OrderSummarizer />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
