import React, { useContext } from "react";
import Button from "../components/Button";
import CodRadioCheck from "../components/Buttons/CODRadioCheck";
import CheckoutCard from "../components/Cards/CheckoutCard";
import Container from "../components/Container";
import { ArrowBigLeft } from "lucide-react";
import { UserAuthContext } from "../context/userAuth/userAuthContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart/cartContext";

import CartItamCard from "../components/Cards/CartItamCard";

const Payments = () => {
  const { cartData, cartTotal } = useContext(CartContext);
  console.log(cartData);
  return (
    <Container>
      <main className="md:h-screen">
        <div className="p-5 text-sm md:text-base font-bold text-center border-b ">
          Your Cart
        </div>
        <div className="md:flex md:flex-row md:justify-evenly h-fit">
          <div className="md:h-[44rem] m-2 p-3 md:m-5 flex flex-col md:w-3/4 rounded-lg">
            <div className="text-gray-600 md:text-2xl">All Products</div>
            <div className="flex flex-col overflow-y-scroll">
              {cartData?.map((item, index) => (
                <CartItamCard key={index} cartProduct={item} />
              ))}
            </div>
          </div>
          <CheckoutCard />
        </div>
      </main>
    </Container>
  );
};

export default Payments;
