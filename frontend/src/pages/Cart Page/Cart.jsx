import React, { useContext, useEffect } from "react";
import Container from "../../components/Container";
import { CartContext } from "../../context/cart/cartContext";
import { UserAuthContext } from "../../context/userAuth/userAuthContext";
import Loader from "../../components/Loader/Loader";
import CartCard from "../../components/CartCard";
import OrderSummarizer from "../../components/OrderSummarizer";

const Cart = () => {
  const { cartData, fetchCartData, isCartLoading } = useContext(CartContext);
  const { isLoggedIn } = useContext(UserAuthContext);

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <Container>
      <div className="flex flex-col gap-4 h-screen">
        <div className="p-5 text-sm md:text-base font-bold text-center border-b ">
          Your Cart
        </div>
        {isLoggedIn ? (
          <>
            {isCartLoading ? (
              <div className="flex h-screen justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div className="mt-2 flex flex-col md:flex-row  items-center justify-center gap-5 ">
                <div className="w-full border-r">
                  {cartData &&
                    !isCartLoading &&
                    cartData.map((cartItem) => {
                      return <CartCard key={cartItem.id} cartItem={cartItem} />;
                    })}
                </div>

                <div className="align-top w-full md:w-1/2">
                  <OrderSummarizer />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-screen justify-center items-center">
            User not logged in!
          </div>
        )}
      </div>
    </Container>
  );
};

export default Cart;
