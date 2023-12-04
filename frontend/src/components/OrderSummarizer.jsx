import React from 'react'
import Button from "../components/Button";

const OrderSummarizer = ({cartTotal, convenienceFee, orderTotal}) => {
  return (
    <div className="m-2 p-3  bg-white border shadow-lg rounded-md flex flex-col items-center justify-center">
              <div className="p-2 font-bold text-sm md:text-base border-b">Order Summary</div>
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
                <div className=" font-bold">{orderTotal}</div>
              </div>

              <Button  type="submit">Confirm Order</Button>

            </div>
  )
}

export default OrderSummarizer