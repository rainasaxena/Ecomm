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
  console.log(userObject);

  return (
    <Container>
      {isLoggedIn && (
        <div className="md:h-screen">
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
              <div className="md:flex md:flex-col justify-around">
                <InfoContainer
                  labelText="Username"
                  inputText={userObject.username}
                />
                <InfoContainer labelText="Email" inputText={userObject.email} />
                <InfoContainer
                  labelText="Mobile Number"
                  inputText={userObject.user_phone}
                />
              </div>

              <div className="block text-gray-700 text-sm md:text-base font-bold mb-1 ml-8">
                My addresses
              </div>

              <div className="ml-8 sm:mb-6 flex flex-col md:flex md:flex-row gap-2 md:gap-5">
                <div className="border rounded-lg p-4 text-sm h-48 w-64 md:h-56 md:w-96 md:text-base shadow-md">
                  <p className="font-bold">
                    {userObject.address[0].address_type}
                  </p>
                  <p>{userObject.address[0].address_line1}</p>
                  <p>{userObject.address[0].address_line2}</p>
                  <p>{userObject.address[0].city}</p>
                  <p>{userObject.address[0].state}</p>
                  <p>{userObject.address[0].country}</p>
                  <p>{userObject.address[0].postal_code}</p>
                  <p>{userObject.user_phone}</p>
                </div>

                <div className="border rounded-lg p-4 text-sm h-48 w-64 md:h-56 md:w-96 md:text-base shadow-md">
                  <p className="font-bold">
                    {userObject.address[1].address_type}
                  </p>
                  <p>{userObject.address[1].address_line1}</p>
                  <p>{userObject.address[1].address_line2}</p>
                  <p>{userObject.address[1].city}</p>
                  <p>{userObject.address[1].state}</p>
                  <p>{userObject.address[1].country}</p>
                  <p>{userObject.address[1].postal_code}</p>
                  <p>{userObject.user_phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default UserProfilePage;
