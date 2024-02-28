import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "./productContext";

export const ProductContextProvider = ({ children }) => {
  const [productData, setProductData] = useState(null);
  const [isProductLoading, setIsProductLoading] = useState(false);

  const fetchProductData = async (catId) => {
    setIsProductLoading(true);
    try {
      const url = `${process.env.REACT_APP_BACKEND_SERVER}/get-products/`;

      console.log(catId);

      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        credentials:"same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({cat_id:catId}),
      });

      const data = await response.json();

      setProductData(data.productsData);
      setIsProductLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <ProductContext.Provider value={{ productData, setProductData, fetchProductData, isProductLoading }}>
      {children}
    </ProductContext.Provider>
  );
};
