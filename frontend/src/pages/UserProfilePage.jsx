import { React, useContext, useState } from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import DropdownContainer from "../components/DropdownContainer";
import InfoContainer from "../components/InfoContainer";
import { Pen } from "lucide-react";
import { UserAuthContext } from "../context/userAuth/userAuthContext";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const { userObject, isLoggedIn } = useContext(UserAuthContext);
  const navigate = useNavigate();
  
  // console.log(isLoggedIn);
  // console.log(userObject.address[0]);


  return (
    <Container>
      {isLoggedIn && (
        <div className="">
          <div className="border-b h-16 md:h-20 flex items-center justify-start">
            <div className="m-auto text-sm md:text-base font-bold">
              Profile Details
            </div>
          </div>

          <div className="md:flex md:gap-12">
            <div className="mt-8 mb-8 md:m-8 flex flex-col items-center justify-center">
              <div className="bg-black h-32 md:h-64 w-32 md:w-64 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={userObject.user_pfp_url}
                  alt=""
                />
              </div>

              <div className="mt-2 mb-2 text-sm md:text-base font-bold">
                {userObject.first_name} {userObject.last_name}
              </div>

              <Button
                onClickFunction={() => {
                  navigate(`/update-profile/${userObject.username}`);
                }}
              >
                <div className="flex gap-2 items-center">
                  <Pen size={15} />
                  Edit Profile
                </div>
              </Button>
            </div>

            <div className="md:flex md:flex-col md:w-full">
              <InfoContainer
                labelText="Username"
                inputText={userObject.username}
              />
              <InfoContainer labelText="Email" inputText={userObject.email} />
              <InfoContainer
                labelText="Mobile Number"
                inputText={userObject.user_phone}
              />
              
              <InfoContainer labelText="Address Line 1" inputText={userObject.address[0].address_line1} />
              <InfoContainer labelText="Address Line 2" inputText={userObject.address[0].address_line2} />
              <div className="flex gap-2 mx-8">
                <Button>Home</Button>
                <Button>Work</Button>
              </div>
              
              <InfoContainer
                labelText="City"
                inputText={userObject.address[0].city}
              />
              <InfoContainer
                labelText="State"
                inputText={userObject.address[0].state}
              />
              <InfoContainer
                labelText="Country"
                inputText={userObject.address[0].country}
              />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default UserProfilePage;
