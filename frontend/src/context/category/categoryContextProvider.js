import React, { useEffect, useState } from "react";
import  {CategoryContext}  from "../category/categoryContext";

export const CategoryContextProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/get-categories/");
        const data = await response.json();
        setCategoryData(data.category_objects);
      } catch (error) {
        console.error("Error Fetching Category Data:", error);
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

