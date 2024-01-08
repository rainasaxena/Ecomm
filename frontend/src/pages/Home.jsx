import React, { useContext } from "react";
import Container from "../components/Container";

const Home = () => {   

  return (
    
    <Container>
     
      <div className="bg-transparent h-[250px] md:h-[500px] m-2 md:m-8 flex overflow-x-hidden ">
        <img
          className="h-full w-full object-cover rounded-xl relative"
          src="https://images.unsplash.com/photo-1504903669937-2f825bf5956f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>

      <div className="flex gap-2 m-2 md:m-8 md:gap-5 ">
        <div className="w-1/2">
          <img
            className="h-full w-full object-cover rounded-xl "
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>

        <div className="w-1/2 gap-2 md:gap-5 flex flex-col">
          <div className="h-1/2">
            <img
              className="h-full w-full object-cover rounded-xl"
              src="https://images.unsplash.com/photo-1499899833954-5ecd9439d17f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>

          <div className=" h-1/2">
            <img
              className="h-full w-full object-cover rounded-xl"
              src="https://images.unsplash.com/photo-1499899833954-5ecd9439d17f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>
      </div>
    </Container>

  );
};

export default Home;
