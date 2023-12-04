import React from 'react'
import { Minus, Plus, Trash2 } from "lucide-react";

const CartCard = ({prod_title, prod_desc, quantity, prod_price}) => {
  return (
    <div className="m-2 bg-white border h-36 md:h-52 shadow-lg rounded-md flex gap-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShyqlCajkHeBz-nwjith0Oev8hvukbeRq22Q&usqp=CAU" alt="" />
              <div className="flex flex-col justify-center gap-1 md:gap-4">
                <div className="text-sm md:text-base font-bold">{prod_title}</div>
                <div className="text-sm text-gray-600">{prod_desc}</div>
                <div className="text-sm bg-slate-300 rounded-md p-1 flex gap-2 items-center justify-center">
                  <div className="">Quantity:</div>
                  <Minus size={18}/>
                  <div className="font-bold text-sm">{quantity}</div>
                  <Plus size={18}/>
                </div>
                <div className="font-bold text-sm md:text-lg">{prod_price}</div>
                <Trash2 size={15}/>
              </div>
            </div>
  )
}

export default CartCard