import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

import { useNavigate } from "react-router-dom";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { CartContext } from "../../context/cart/cartContext";
import { UserAuthContext } from "../../context/userAuth/userAuthContext";

const PaymentStatusPage = () => {
  const { merchantId, transactionId, addressType } = useParams();
  const [status, setStatus] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const { cartData, fetchCartData, cartTotal, cartId } =
    useContext(CartContext);
  const { userObject, isLoggedIn } = useContext(UserAuthContext);
  const navigate = useNavigate();

  const pollStatus = async (merchantId, transactionId) => {
    const st =
      `/pg/v1/status/${merchantId}/${transactionId}` +
      process.env.REACT_APP_SALT_ID;
    const dataSha256 = sha256(st);

    const checksum = dataSha256 + "###" + "1";

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PHONEPE_STATUS_URL}/${merchantId}/${transactionId}`,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
            "X-MERCHANT-ID": `${merchantId}`,
          },
        }
      );
      const status = response.data.code;
      if (status == "PAYMENT_SUCCESS") {
        setStatus(status);
        setStatusMessage(response.data.message);
        try {
          const url = `${process.env.REACT_APP_BACKEND_SERVER}/orders/create/`;
          const res = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: userObject.username,
              email: userObject.email,
              cart_id: cartId,
              total_amount: cartTotal,
              payment_date: new Date(),
              payment_status: "success",
              is_paid: true,
              shipping_address: userObject.address.find(
                (addr) => addr.address_type === addressType
              ),
              transaction_id: transactionId,
            }),
          });

          if (res.status === 200) {
            navigate("/orders");
          } else {
            navigate("/");
          }
        } catch (err) {
          console.log(err);
        }
      } else if (status == "PAYMENT_ERROR") {
        setStatus(status);
        setStatusMessage(response.data.message);
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error polling status:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (cartData.length !== 0) {
      pollStatus(merchantId, transactionId);
    }
  }, [cartData]);

  console.log(
    userObject?.address?.find((addr) => addr.address_type === addressType)
  );

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center gap-5">
        <Loader />
        <h1 className="text-2xl font-bold mt-4">{"Processing Payment..."}</h1>
      </div>
    </main>
  );
};

export default PaymentStatusPage;
