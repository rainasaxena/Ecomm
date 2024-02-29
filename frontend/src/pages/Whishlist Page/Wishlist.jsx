import React, { useContext, useEffect } from "react";
import { WishlistContext } from "../../context/wishlist/wishlistContext";
import { ProductContext } from "../../context/products/productContext";
import { UserAuthContext } from "../../context/userAuth/userAuthContext";
import Loader from "../../components/Loader/Loader";
import WishlistCard from "../../components/WishlistCard";
import Container from "../../components/Container";

const Wishlist = () => {
  const { wishlistData, fetchWishlistData, isLoading } =
    useContext(WishlistContext);
  const { productData, setProductData, fetchProductData } =
    useContext(ProductContext);
  const userDetails = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchWishlistData(userDetails.username, userDetails.email);
  }, []);

  return (
    <Container>
      <div className="flex flex-col h-max">
        <div className="p-5 text-sm md:text-base font-bold text-center border-b ">
          Your Wishlist
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-wrap m-2  justify-evenly md:justify-center gap-2 md:gap-5">
            {wishlistData &&
              wishlistData.map((item, index) => (
                <WishlistCard
                  prod_id={item.prod_id}
                  prod_image_url={item.prod_image_url}
                  prod_title={item.prod_title}
                  prod_price={item.prod_price}
                  prod_old_price={item.prod_old_price}
                  prod_desc={item.prod_desc}
                />
              ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Wishlist;
