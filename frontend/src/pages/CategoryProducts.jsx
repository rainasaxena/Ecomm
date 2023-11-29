import React, { useContext, useEffect, useState } from "react";
import HeroImage from "../components/HeroImage";
import Card from "../components/Card";
import Container from "../components/Container";
import  {CategoryContext}  from "../context/category/categoryContext"
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/products/productContext";


const CategoryProducts = () => {
  const { cat_id } = useParams();
  const { categoryData } = useContext(CategoryContext);
  const { productData, setProductData, fetchProductData } = useContext(ProductContext);
  const [categoryObjectData, setCategoryObjectData] = useState(null)

  const [isLoading, setIsLoading] = useState (false)

  useEffect(()=>{
    setIsLoading(true)
    if (categoryData) {
      const categoryObject = categoryData.find((item) => item.cat_id === cat_id);
      setCategoryObjectData(categoryObject);
    }
    fetchProductData(cat_id)
    setIsLoading(false)
  },[categoryData, cat_id])

  console.log(productData)
  return (
    <>
      {categoryData && (
        <Container>
          <HeroImage imageUrl={categoryObjectData?.cat_image_url} />
          <div className="flex flex-wrap m-2  justify-evenly md:justify-center gap-2 md:gap-5">
          <Card />
          <Card />
          <Card />
          <Card />
          </div>
        </Container>
      )}
    </>
  );
};

export default CategoryProducts;
