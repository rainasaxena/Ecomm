import React, { useContext, useEffect, useState } from "react";
import Container from "../../components/Container";
import { UserAuthContext } from "../../context/userAuth/userAuthContext";

import { useNavigate } from "react-router-dom";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { userObject, isLoggedIn } = useContext(UserAuthContext);
  const [formData, setFormData] = useState({
    name: userObject?.first_name + " " + userObject?.last_name,
    email: userObject?.email,
    phone: userObject?.user_phone,
    address: {},
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionid = "Tr-" + uuidv4().toString(36).slice(-6);
    const merchantId = "PGTESTPAYUAT";

    const payload = {
      merchantId: merchantId,
      merchantTransactionId: transactionid,
      merchantUserId: "MUID-" + userObject?.id,
      amount: formData.amount,
      redirectUrl: `http://localhost:3000/${merchantId}/${transactionid}`,
      redirectMode: "REDIRECT",
      callbackUrl: `http://localhost:3000/${merchantId}/${transactionid}`,
      mobileNumber: formData.phone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const dataPayload = JSON.stringify(payload);

    // const dataBase64 = Buffer.from(dataPayload).toString("base64");
    const dataBase64 = btoa(dataPayload);

    const fullURL =
      dataBase64 + "/pg/v1/pay" + "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
    const dataSha256 = sha256(fullURL);

    const checksum = dataSha256 + "###" + "1";

    const UAT_PAY_API_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    try {
      const response = await axios.post(
        UAT_PAY_API_URL,
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
      console.log("ERROR: ", error);
    }
  };

  return (
    <Container>
      <div className="flex flex-col h-screen">
        <h1 className="text-3xl my-6 font-bold">Payment</h1>
        <div className="flex flex-col h-max justify-center items-center">
          <div className="flex flex-col shadow-lg p-4 rounded-lg w-1/2">
            <h1 className="text-3xl font-bold text-center my-6">
              Payment Details
            </h1>
            <input
              type="text"
              placeholder="Name"
              className="border p-2 rounded-lg my-2 px-5"
              name="name"
              value={userObject?.first_name + " " + userObject?.last_name}
              onChange={handleChange}
              readOnly
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded-lg my-2 px-5"
              name="email"
              value={userObject?.email}
              onChange={handleChange}
              readOnly
            />
            <input
              type="text"
              placeholder="Phone"
              className="border p-2 rounded-lg my-2 px-5"
              name="phone"
              value={userObject?.user_phone}
              onChange={handleChange}
            />
            {/* <input
              type="text"
              placeholder="Address"
              className="border p-2 rounded-lg my-2 px-5"
              name="address" 
              value={formData.address}
              onChange={handleChange}
            /> */}
            <input
              type="text"
              placeholder="Amount"
              className="border p-2 rounded-lg my-2 px-5"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-lg my-2"
              onClick={handleSubmit}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PaymentPage;
