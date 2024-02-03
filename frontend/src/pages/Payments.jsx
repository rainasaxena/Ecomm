import React, { useContext } from "react";
import Button from "../components/Button";

import Container from "../components/Container";
import { ArrowBigLeft } from "lucide-react";
import { UserAuthContext } from "../context/userAuth/userAuthContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart/cartContext";

const Payments = () => {
   const {userObject} = useContext(UserAuthContext);
   const {cartTotal} = useContext(CartContext);
  //  console.log(userObject.email);
  


  return (
    <>
      <Container>
        <div className="p-5 text-sm md:text-base font-bold text-center border-b ">
          Place your order
        </div>
        <div className="p-5 text-sm md:text-base font-bold text-left ">
          <div className="flex flex-row text-gray-500">
            <ArrowBigLeft color="black" />
            Go back
          </div>
        </div>

        <div className="md:flex md:flex-row md:justify-evenly">
          <div className="mt-5 md:m-8 flex flex-col items-center justify-center  md:w-1/2 md: rounded-lg ">
            <div className="text-gray-600 md:text-2xl">Order Total</div>
            <div className="text-black font-bold text-3xl md:text-5xl ">
              {cartTotal}
            </div>
          </div>

          <div className="p-5 mt-5 text-sm md:text-base flex justify-center  font-poppins">
            <div className=" w-50 md:w-96 h-50 md:h-90 p-5 rounded-xl bg-white border text-center ">
              <h2 className="text-black mb-5 font-bold">Enter your details</h2>
              <form className="flex flex-col">
                <label className="text-left mb-1 mt-2" for="email">
                  E-mail
                </label>

                {userObject && (
                  <input
                  className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
                  name="email"
                  type="text"
                  id="username"
                  placeholder={userObject.email} disabled
                />

                )}
                
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input type="checkbox" value="Cash on delivery" />
                    <label for="Cash on delivery" className="text-base">
                      Cash on delivery
                    </label>
                  </div>

                  <Button type="submit">Place Order</Button>
                  <div className="mt-3 text-gray-500">----OR----</div>
                </div>

                <label className="text-left mb-1 mt-2" for="password">
                  Card Number
                </label>
                <input
                  className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg"
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Enter your Card Number"
                />

                <div className="flex gap-2">
                  <input
                    className="p-2 mb-2 w-1/2 border-[1px] border-solid border-[#ddd] rounded-lg"
                    name="password"
                    type="password"
                    id="password"
                    placeholder="CVV"
                  />
                  <input
                    className="p-2 mb-2  border-[1px] border-solid border-[#ddd] rounded-lg"
                    name="password"
                    type="password"
                    id="password"
                    placeholder="MM / YY"
                  />
                </div>

                <label className="text-left mb-1 mt-2" for="email">
                  Cardholder Name
                </label>
                <input
                  className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
                  name="email"
                  type="text"
                  id="username"
                  placeholder="Full name on card"
                />

                <label className="text-left mb-1 mt-2" for="email">
                  Country or region
                </label>
                <input
                  className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
                  name="email"
                  type="text"
                  id="username"
                  placeholder="India"
                  disabled
                />

                <Button type="submit">Pay</Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Payments;
