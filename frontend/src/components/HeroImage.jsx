import React from 'react'

const HeroImage = ({imageUrl, altText}) => {
  return (
    <div className="bg-transparent h-[250px] md:h-[500px] m-2 md:m-8 flex overflow-x-hidden ">
        <img
          className="h-full w-full object-cover rounded-xl relative"
          src={imageUrl}
          alt={altText}
        />
      </div>
  )
}

export default HeroImage