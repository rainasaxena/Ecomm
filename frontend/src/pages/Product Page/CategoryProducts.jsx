import React, { useContext, useEffect, useState } from "react";
import HeroImage from "../../components/HeroImage";
import Card from "../../components/Card";
import Container from "../../components/Container";
import { CategoryContext } from "../../context/category/categoryContext";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/products/productContext";
import Loader from "../../components/Loader/Loader";

const CategoryProducts = () => {
  const { cat_id } = useParams();
  const { categoryData } = useContext(CategoryContext);
  const { productData, fetchProductData, isProductLoading } =
    useContext(ProductContext);
  const [categoryObjectData, setCategoryObjectData] = useState(null);

  const [loading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      if (categoryData) {
        const categoryObject = categoryData.find(
          (item) => item.cat_id === cat_id
        );
        setCategoryObjectData(categoryObject);
      }
      fetchProductData(cat_id);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  }, [categoryData, cat_id]);

  return (
    <>
      {isProductLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {categoryData && (
            <Container>
              <HeroImage imageUrl={categoryObjectData?.cat_image_url} />
              <div className="flex flex-wrap m-2  justify-evenly md:justify-center gap-2 md:gap-5">
                {productData &&
                  !isProductLoading &&
                  productData.map((item, index) => (
                    <Card
                      prod_id={item.prod_id}
                      prod_image_url={item.prod_image_url}
                      prod_title={item.prod_title}
                      prod_price={item.prod_price}
                      prod_old_price={item.prod_old_price}
                      prod_desc={item.prod_desc}
                    />
                  ))}
              </div>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default CategoryProducts;
