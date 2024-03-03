import React from "react";
import { convertDate } from "../../utils/dateUtils";
import { twMerge } from "tailwind-merge";
import OrderItamCard from "../../components/Cards/OrderItemCard";

const OrdersContainer = ({ orderData }) => {
  return (
    <div className="flex flex-col h-max border-2 border-solid border-gray-300 rounded-lg mt-4">
      <div className="flex flex-col md:flex-row flex-1 bg-gray-100 h-10 rounded-lg rounded-b-none p-4 divide-y-2 divide-gray-300 md:divide-y-0">
        <div className="flex flex-2 gap-8">
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-xs md:text-base text-gray-600">ORDER PLACED</p>
            <p className="text-xs md:text-sm text-gray-700 font-bold">
              {convertDate(orderData?.order?.payment_date)}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-xs md:text-base text-gray-600">TOTAL</p>
            <p className="text-xs md:text-sm text-gray-700 font-bold">
              {orderData?.order?.total_amount}
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-start justify-start gap-1">
            <p className="text-xs md:text-base text-gray-600">SHIP TO</p>
            <p className="text-xs md:text-sm text-gray-700 font-bold">
              {orderData?.order?.shipping_address.address_line1}
            </p>
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center mt-3 md:mt-0">
          <div className="flex-col gap-1">
            <p className="text-xs md:text-base text-gray-600 mt-3 md:mt-0">
              ORDER #{" "}
              <span className="text-gray-700 font-bold">
                {orderData?.order?.order_id}
              </span>
            </p>
            <p className="text-xs md:text-base text-gray-600 mt-1">
              PAYMENT STATUS:{" "}
              <span
                className={twMerge(
                  orderData?.order?.payment_status === "success"
                    ? "text-green-600 font-bold text-xs md:text-base"
                    : "text-red-600 font-bold text-xs md:text-base"
                )}
              >
                {orderData?.order?.payment_status === "success"
                  ? "Paid"
                  : "Pending"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 h-50 rounded-lg p-4 ">
        <p
          className={twMerge(
            "text-base md:text-xl font-bold",
            orderData?.order?.delivery_status === "Delivered"
              ? "text-gray-600"
              : "text-green-800"
          )}
        >
          {orderData?.order?.delivery_status === "Delivered"
            ? "Order Delivered"
            : "Arriving Soon"}
        </p>
        <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-start gap-3 w-full">
          {orderData?.order_items?.map((item, index) => (
            <OrderItamCard orderItem={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersContainer;
