import React, { useContext, useEffect } from "react";
import Container from "../components/Container";
import { CartContext } from "../context/cart/cartContext";
import CartCard from "../components/CartCard";
import OrderSummarizer from "../components/OrderSummarizer";
import Loader from "../components/Loader";
import { UserAuthContext } from "../context/userAuth/userAuthContext";

const Cart = () => {
  const { cartData, fetchCartData, isCartLoading } = useContext(CartContext);
  const { isLoggedIn } = useContext(UserAuthContext);

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <>
      <Container>
        <div className="p-5 text-sm md:text-base font-bold text-center border-b ">
          Your Cart
        </div>
        {isLoggedIn ? (
          <div className="mt-2 flex flex-col md:flex-row  items-center justify-center gap-5 ">
            <div className="w-full border-r">
              {isCartLoading && <Loader />}

              {cartData &&
                !isCartLoading &&
                cartData.map((cartItem) => {
                  return <CartCard key={cartItem.id} cartItem={cartItem} />;
                })}
            </div>

            <div className="w-full md:w-1/2">
              <OrderSummarizer />
            </div>
          </div>
        ) : (
          <div className="flex h-screen justify-center items-center">
            User not logged in!
          </div>
        )}
      </Container>
    </>
  );
};

export default Cart;
