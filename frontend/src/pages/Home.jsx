import React, { useContext } from "react";
import Container from "../components/Container";
import { ProductContext } from "../context/products/productContext";
import { useEffect } from "react";
import SwiperGallery from "../components/SwiperGallery/SwiperGallery";
import { SwiperSlide } from "swiper/react";
import { checkTokenValidity } from "../utils/authUtils";

const Home = () => {
  const { getFeaturedProducts, featuredProducts } = useContext(ProductContext);

  useEffect(() => {
    if (localStorage.getItem("authTokens")) {
      checkTokenValidity();
    }
    getFeaturedProducts();
  }, []);

  return (
    <Container>
      <div className="flex flex-col">
        <div className="bg-transparent h-[250px] md:h-[500px] m-2 md:m-8 flex overflow-x-hidden ">
          <SwiperGallery>
            <SwiperSlide>
              <img
                className="h-full w-full object-cover rounded-xl relative"
                src="https://www.noajewelry.shop/cdn/shop/files/A625E631-3E2D-42FD-A2C4-97DAE9837B37.png?v=1706747530"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="h-full w-full object-cover rounded-xl relative"
                src="https://www.noajewelry.shop/cdn/shop/collections/resort-collection-139526.jpg?v=1681847923"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="h-full w-full object-cover rounded-xl relative"
                src="https://www.noajewelry.shop/cdn/shop/collections/image.heic?v=1702858042s"
                alt=""
              />
            </SwiperSlide>
          </SwiperGallery>
        </div>

        <div className="font-bold text-md md:text-2xl m-2 md:m-8">
          Featured Products @ Luxe..
        </div>

        <div className="flex gap-2 m-2 md:m-8 md:gap-5 h-screen">
          <div className="relative w-1/2 group">
            <a href={`${featuredProducts[0]?.category.cat_id}/products`}>
              <img
                className="shadow-md h-full w-full object-cover rounded-xl"
                src={featuredProducts[0]?.prod_image_url}
                alt=""
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-gradient-to-b from-transparent to-black rounded-xl">
                <h2 className=" text-white text-sm md:text-4xl font-bold p-2 rounded-xl">
                  {featuredProducts[0]?.prod_title}
                </h2>
                <h2 className="text-center text-white text-xs md:text-2xl p-2 rounded-xl">
                  {featuredProducts[0]?.prod_desc}
                </h2>
              </div>
            </a>
          </div>

          <div className="w-1/2 gap-2 md:gap-5 flex flex-col">
            <div className="relative h-1/2 group">
              <a href={`${featuredProducts[1]?.category.cat_id}/products`}>
                <img
                  className="shadow-md h-full w-full object-cover rounded-xl"
                  src={featuredProducts[1]?.prod_image_url}
                  alt=""
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-gradient-to-b from-transparent to-black rounded-xl">
                  <h2 className=" text-center text-white text-sm md:text-4xl font-bold p-2 rounded-xl">
                    {featuredProducts[1]?.prod_title}
                  </h2>
                  <h2 className="text-center text-white text-xs md:text-2xl p-2 rounded-xl">
                    {featuredProducts[1]?.prod_desc}
                  </h2>
                </div>
              </a>
            </div>

            <div className="relative h-1/2 group">
              <a href={`${featuredProducts[2]?.category.cat_id}/products`}>
                <img
                  className="shadow-md h-full w-full object-cover rounded-xl"
                  src={featuredProducts[2]?.prod_image_url}
                  alt=""
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-gradient-to-b from-transparent to-black rounded-xl">
                  <h2 className=" text-white text-sm md:text-4xl font-bold p-2 rounded-xl">
                    {featuredProducts[2]?.prod_title}
                  </h2>
                  <h2 className="text-center text-white text-xs md:text-2xl p-2 rounded-xl">
                    {featuredProducts[2]?.prod_desc}
                  </h2>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
