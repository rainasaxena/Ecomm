import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import { CartContext } from "../context/cart/cartContext";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../context/userAuth/userAuthContext";
import DropdownContainer from "./ProfileDropdown/DropdownContainer";

const OrderSummarizer = () => {
  const { cartData, cartTotal } = useContext(CartContext);
  const {userObject} = useContext(UserAuthContext)


  const [convenienceFee, setConvenienceFee] = useState(150);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (cartTotal > 1000) {
      setConvenienceFee(0);
    } else {
      setConvenienceFee(150);
    }
  }, [cartTotal]);

  console.log(userObject)

  return (
    <div className="m-2 p-5  bg-white border shadow-lg rounded-md flex flex-col justify-center">
      
      <form action="">
        <div className="flex flex-col gap-2">
        <label htmlFor="" className="">Deliver to</label>
        <input type="text" className="px-5 p-2 rounded-md bg-gray-100" value={`${userObject.first_name} ${userObject.last_name}`} readOnly/>
        <label htmlFor="" className="">Email</label>
        <input type="text" className="px-5 p-2 rounded-md bg-gray-100" value={`${userObject.email}`} readOnly/>
        <label htmlFor="" className="">Phone</label>
        <input type="text" className="px-5 p-2 rounded-md bg-gray-100" value={`${userObject.user_phone}`} readOnly/>
        <DropdownContainer
            labelText="Address"
            // selectedValue={addressType}
            // onSelectChange={setAddressType}
            // options=userObject.address.map((addr) => {return})

          />
        </div>
      </form>
      

      <div className="mt-4 p-2 font-bold text-sm md:text-base border-b">
        Order Summary
      </div>

      <div className="text-sm md:text-base p-1 w-full flex items-center justify-between">
        <div className="text-gray-600">Cart Total</div>
        <div className="font-bold">{cartTotal}</div>
      </div>

      <div className="text-sm md:text-base p-1 w-full flex items-center justify-between">
        <div className=" text-gray-600">Convenience Fee</div>
        <div className=" font-bold">{convenienceFee}</div>
      </div>

      <div className="text-sm mb-4 md:text-base p-1 w-full flex items-center justify-between">
        <div className=" text-gray-600">Order Total</div>
        <div className=" font-bold">{convenienceFee + cartTotal}</div>
      </div>

      <Button onClickFunction={()=>navigate('/payments')}>
        Checkout
      </Button>
      
    </div>
  );
};

export default OrderSummarizer;
