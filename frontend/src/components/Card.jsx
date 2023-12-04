import { Heart } from 'lucide-react'
import React from 'react'


const Card = ({prod_image_url,prod_title, prod_price,prod_old_price, prod_desc}) => {
  return (
    <div className="w-36 md:w-72 mb-2 rounded-md overflow-hidden border">
      <div className="p-2 relative">
      <img className="h-28 md:h-56 w-full rounded-md" src={prod_image_url} alt="Card Image"/>
      <Heart className='absolute top-4 right-4 visible md:invisible' size={20} color='white'/>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
        <p className="text-[12px] md:text-[18px] text-gray-600 font-bold">{prod_title}</p>
        <Heart className='invisible md:visible' size={30}/>
        </div>
        <p className="text-[10px] md:text-[16px] text-gray-500 ">{prod_desc}</p>
        <div className="flex gap-2">
        <p className="text-[10px] md:text-[16px] text-gray-950 font-bold ">{prod_price}</p>
        <p className="text-[10px] md:text-[16px] text-gray-950 font-bold "><s>{prod_old_price}</s></p>
        </div>
      </div>
    </div>
  )
}

export default Card