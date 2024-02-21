import React, { useEffect, useState } from "react";
import { CategoryContext } from "../category/categoryContext";

export const CategoryContextProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [error, setError] = useState(false);

  // Fetch Category Data

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(
          `https://ecomm-backend-v1.onrender.com/get-categories/`
        );
        const data = await response.json();
        setCategoryData(data.category_objects);
      } catch (error) {
        console.error("Error Fetching Category Data:", error);
        setError(true);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <CategoryContext.Provider value={{ categoryData }}>
      {children}
    </CategoryContext.Provider>
  );
};
