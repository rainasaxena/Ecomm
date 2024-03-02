import { useContext, useState } from "react";
import { UserAuthContext } from "../userAuth/userAuthContext";
import { checkTokenValidity } from "../../utils/authUtils";
import { OrderContext } from "./orderConterx";

export const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const { userObject, isLoggedIn, authTokens } = useContext(UserAuthContext);

  const fetchOrders = async () => {
    setIsOrderLoading(true);
    if (!isLoggedIn) {
      setOrders([]);
    } else {
      const isValid = await checkTokenValidity();
      if (isValid) {
        const url = `${process.env.REACT_APP_BACKEND_SERVER}/orders/`;
        const res = await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
          body: JSON.stringify({
            username: userObject.username,
            email: userObject.email,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders);
          setIsOrderLoading(false);
        }
      } else {
        setIsOrderLoading(false);
      }
    }
  };

  return (
    <OrderContext.Provider value={{ orders, setOrders, fetchOrders, isOrderLoading}}>
      {children}
    </OrderContext.Provider>
  );
};
