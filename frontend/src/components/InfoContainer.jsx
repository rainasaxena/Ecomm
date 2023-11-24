import React from 'react'

const InfoContainer = ({labelText, inputText}) => {
  return (
    // <div className="flex flex-col m-8">
    //     <label className='text-gray-600 text-xs font-bold'>Username</label>
    //     <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text"
    //                 id="exampleInput"
    //                 name="exampleInput"
    //                 value="Type something..." />
        
    // </div>

    <div className="mx-8 my-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              {labelText}
            </label>
            <input
              value={inputText}
              
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              readOnly
              
            />
          </div>
  )
}

export default InfoContainer