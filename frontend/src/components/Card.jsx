import { Heart } from 'lucide-react'
import React from 'react'


const Card = ({imageUrl, price, description}) => {
  return (
    <div className="w-36 md:w-72 mb-2 rounded-md overflow-hidden border">
      <div className="p-2 relative">
      <img className="h-28 md:h-56 w-full rounded-md" src="https://images.unsplash.com/photo-1579726670131-487ecc8e1e8a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Card Image"/>
      <Heart className='absolute top-4 right-4 visible md:invisible' size={20}/>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
        <p className="text-[12px] md:text-[18px] text-gray-600 font-bold">ADIDAS ORIGINALS</p>
        <Heart className='invisible md:visible' size={30}/>
        </div>
        <p className="text-[10px] md:text-[16px] text-gray-500 ">Men's Casual Low Top </p>
        <div className="flex gap-2">
        <p className="text-[10px] md:text-[16px] text-gray-950 font-bold ">$19.99</p>
        <p className="text-[10px] md:text-[16px] text-gray-950 font-bold "><s>$19.99</s></p>
        </div>
      </div>
    </div>
  )
}

export default Card