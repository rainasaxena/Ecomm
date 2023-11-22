import React from 'react'

const Card = ({imageUrl, price, description}) => {
  return (
    <div class="w-36 md:w-72 mb-2 rounded-xl overflow-hidden shadow-lg">
      <img class="w-full" src={imageUrl} alt="Card Image"/>
      <div class="p-4">
        <p class="text-gray-900 font-bold text-xl">{price}</p>
        <p class="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  )
}

export default Card