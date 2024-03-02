import React, { useContext, useEffect } from "react";
import Container from "../../components/Container";
import { CartContext } from "../../context/cart/cartContext";
import { UserAuthContext } from "../../context/userAuth/userAuthContext";
import CheckoutCard from "../../components/Cards/CheckoutCard";

import CartItamCard from "../../components/Cards/CartItamCard";
import Loader from "../../components/Loader/Loader";

const Cart = () => {
  const { cartData, cartId, fetchCartData, isCartLoading } =
    useContext(CartContext);
  const { isLoggedIn } = useContext(UserAuthContext);

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <Container>
      <main className="md:h-screen">
        <div className="p-5 text-sm md:text-base font-bold text-center border-b ">
          Your Cart
        </div>
        {isLoggedIn ? (
          <div className="md:flex md:flex-row md:justify-evenly h-fit">
            {!isCartLoading ? (
              <>
                <div className="md:h-[44rem] m-2 p-3 md:m-5 flex flex-col md:w-3/4 rounded-lg">
                  <div className="text-gray-600 md:text-2xl">All Products</div>
                  <div className="flex flex-col overflow-y-scroll">
                    {cartData.length === 0 ? (
                      <div className="flex justify-center items-center overflow-hidden h-[40rem]">
                        <div className="text-gray-600 md:text-2xl mt-5">
                          No products in cart
                        </div>
                      </div>
                    ) : (
                      cartData?.map((item, index) => (
                        <CartItamCard
                          key={index}
                          cartProduct={item}
                          cartId={cartId}
                        />
                      ))
                    )}
                  </div>
                </div>
                <CheckoutCard />
              </>
            ) : (
              <div className="flex justify-center items-center h-screen gap-3">
                <Loader className="h-10 w-10" />
                <p className="text-gray-600 md:text-2xl">Loading...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className=" text-gray-600 md:text-2xl mt-5">
              User is not logged in
            </div>
          </div>
        )}
      </main>
    </Container>
  );
};

export default Cart;
