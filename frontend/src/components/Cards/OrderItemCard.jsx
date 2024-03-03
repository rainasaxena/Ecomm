import React, { useContext, useState } from "react";
import { Trash } from "lucide-react";
import { CartContext } from "../../context/cart/cartContext";

const OrderItamCard = ({ orderItem }) => {
  return (
    <div className="w-fit md:w-2/5 h-max flex mt-3 items-center md:mt-5 rounded-lg shadow-sm">
      <div className="flex items-center justify-center w-max h-max p-2">
        <img
          src={orderItem?.product?.prod_image_url}
          className="w-20 md:w-32 h-full md:h-28 object-cover rounded-lg"
          alt=""
        />
      </div>
      <div className="w-full p-2 flex my-2">
        <div className="flex flex-col w-full items-centerc justify-center">
          <div className="text-sm md:text-xl font-bold">
            {orderItem?.product?.prod_title}
          </div>
          <p class="hidden md:block text-gray-600 text-xs md:text-sm line-clamp-2">
            {orderItem?.product?.prod_desc}
          </p>
          <div className="flex w-full items-start mt-1 md:mt-2 divide-x divide-solid divide-gray-400">
            <div className="text-gray-600 font-bold text-xs md:text-base">
              Price:<span className="text-gray-700 font-normal text-xs md:text-base">{` ₹${orderItem?.product?.prod_price * orderItem?.quantity}`}</span>
            </div>
            <div className="text-gray-600 font-bold text-xs md:text-base ml-3 pl-3">
              Quantity:<span className="text-gray-700 font-normal text-xs md:text-base">{` ${orderItem?.quantity}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItamCard;
