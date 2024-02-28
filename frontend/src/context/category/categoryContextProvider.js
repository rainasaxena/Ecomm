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
          `${process.env.REACT_APP_BACKEND_SERVER}/get-categories/`
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
