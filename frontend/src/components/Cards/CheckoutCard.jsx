import React, { useContext, useEffect, useState } from "react";
import Button from "../Button";

import { UserAuthContext } from "../../context/userAuth/userAuthContext";
import { CartContext } from "../../context/cart/cartContext";

import AddressDropdown from "./AddressDropdown";

import sha256 from "crypto-js/sha256";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const CheckoutCard = () => {
  const { userObject } = useContext(UserAuthContext);
  const { cartTotal } = useContext(CartContext);
  const [addressType, setAddressType] = useState("Home");
  const [phone, setPhone] = useState("");
  const [convenienceFee, setConvenienceFee] = useState(150);

  useEffect(() => {
    if (cartTotal > 1000) {
      setConvenienceFee(0);
    } else {
      setConvenienceFee(150);
    }
  }, [cartTotal]);

  useEffect(() => {
    if (userObject.user_phone) {
      setPhone(userObject.user_phone);
    }
  }, [userObject]);

  const startPayment = async (e) => {
    e.preventDefault();

    const transactionid = "Tr-" + uuidv4().toString(36).slice(-6);
    const merchantId = process.env.REACT_APP_MERCHANT_ID;
    const saltID = process.env.REACT_APP_SALT_ID;

    const payload = {
      merchantId: merchantId,
      merchantTransactionId: transactionid,
      merchantUserId: "MUID-" + userObject.id,
      amount: cartTotal,
      redirectUrl: `http://localhost:3000/${merchantId}/${transactionid}/${addressType}`,
      redirectMode: "REDIRECT",
      callbackUrl: `http://localhost:3000/${merchantId}/${transactionid}/${addressType}`,
      mobileNumber: phone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const dataPayload = JSON.stringify(payload);
    const dataBase64 = btoa(dataPayload);

    const fullURL =
      dataBase64 + "/pg/v1/pay" + saltID;
    const dataSha256 = sha256(fullURL);

    const checksum = dataSha256 + "###" + "1";

    if (
      userObject.id === undefined ||
      cartTotal === undefined ||
      phone === undefined
    ) {
      alert("Please fill all the details");
    } else {
      try {
        const response = await axios.post(
          process.env.REACT_APP_UAT_PAY_API_URL,
          {
            request: dataBase64,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              "X-VERIFY": checksum,
            },
          }
        );
        const redirectUrl =
          response.data.data.instrumentResponse.redirectInfo.url;
        window.location.href = redirectUrl;
      } catch (error) {
        alert("Something went wrong");
        console.log("ERROR: ", error);
      }
    }
  };

  return (
    <div className="p-5 mt-5 text-sm md:text-base flex justify-center  font-poppins">
      <div className=" w-50 md:w-96 h-50 md:h-90 p-5 rounded-xl bg-white border text-center ">
        <h2 className="text-black mb-5 font-bold">Enter your details</h2>
        <form className="flex flex-col">
          <label className="text-left mb-1 mt-2" htmlFor="email">
            E-mail
          </label>
          {userObject && (
            <input
              className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
              name="email"
              type="text"
              id="username"
              placeholder={userObject.email}
              disabled
            />
          )}

          {/* <CodRadioCheck /> */}

          <label className="text-left mb-1 mt-2" htmlFor="email">
            User Name
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="email"
            type="text"
            id="username"
            placeholder="Full name on card"
            value={`${userObject?.first_name} ${userObject?.last_name}`}
            readOnly
            disabled
          />
          <label className="text-left mb-1 mt-2" htmlFor="email">
            Phone
          </label>
          <input
            className="p-2 mb-2 border-[1px] border-solid border-[#ddd] rounded-lg "
            name="phone"
            type="text"
            id="username"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <AddressDropdown
            labelText="Address"
            selectedValue={addressType}
            onSelectChange={setAddressType}
            options={userObject?.address.map((addr) => {
              return addr.address_line1;
            })}
            values={userObject?.address.map((addr) => {
              return addr.address_type;
            })}
          />
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
          <Button type="submit" onClickFunction={startPayment}>
            Place Order
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutCard;
