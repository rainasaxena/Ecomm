import React, { useContext, useEffect } from "react";
import Container from "../../components/Container";
import { OrderContext } from "../../context/orders/orderConterx";
import OrdersContainer from "../../components/Cards/OrdersContainer";
import Loader from "../../components/Loader/Loader";

const OrdersPage = () => {
  const { orders, isOrderLoading, fetchOrders } = useContext(OrderContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container>
      <main className="h-screen flex flex-col divide-y-2">
        <section className="mt-10 mx-3">
          <h1 className="text-base md:text-2xl text-black font-bold">Your Orders</h1>
        </section>
        {!isOrderLoading ? (
          <section className="h-full overflow-y-auto flex flex-col m-3 mt-0 no-scrollbar">
            {orders.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-full">
                <h1 className="text-base md:text-2xl text-gray-700">
                  You Have No Orders 🙃
                </h1>
              </div>
            ) : (
              orders?.map((order, index) => (
                <OrdersContainer orderData={order} key={index} />
              ))
            )}
          </section>
        ) : (
          <div className="flex justify-center items-center h-screen gap-3">
            <Loader className="h-10 w-10" />
            <p className="text-gray-600 md:text-2xl">Loading...</p>
          </div>
        )}
      </main>
    </Container>
  );
};

export default OrdersPage;
