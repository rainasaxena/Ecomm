import React from 'react'

const InfoContainer = ({labelText, inputText}) => {
  return (

    <div className="mx-8 my-4">
            <label className="block text-gray-700 text-sm md:text-base font-bold mb-1">
              {labelText}
            </label>
            <input
              value={inputText}
              
              className="text-sm md:text-base appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              readOnly
              
            />
          </div>
  )
}

export default InfoContainer