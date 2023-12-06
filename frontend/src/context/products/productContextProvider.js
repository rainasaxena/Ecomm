import React, { useState } from "react";
import { ProductContext } from "./productContext";

export const ProductContextProvider = ({ children }) => {
  const [productData, setProductData] = useState(null);

  const fetchProductData = async (catId) => {
    try {
      const url = "http://127.0.0.1:8000/get-products/";

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
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <ProductContext.Provider value={{ productData, setProductData, fetchProductData }}>
      {children}
    </ProductContext.Provider>
  );
};
