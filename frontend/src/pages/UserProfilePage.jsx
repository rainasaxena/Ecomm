import { React, useContext} from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import InfoContainer from "../components/InfoContainer";
import { UserAuthContext } from "../context/userAuth/userAuthContext";
import { useNavigate } from "react-router-dom";
import UserAddressCard from "../components/Cards/UserAddressCard";
import Loader from "../components/Loader/Loader";

const UserProfilePage = () => {
  const { userObject, isLoggedIn } = useContext(UserAuthContext);
  const navigate = useNavigate();

  return (
    <Container>
      {isLoggedIn ? (
        <div className="md:h-full h-max mb-4">
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

              <div className="flex items-center justify-between my-4 ml-8 mr-3">
                <div className="block text-gray-700 text-sm md:text-lg font-semibold">
                  My addresses
                </div>
                <Button onClickFunction={() => navigate("/add-address")}>
                  Add new address
                </Button>
              </div>

              <div className="ml-8 sm:mb-6 flex flex-col md:flex md:flex-row md:flex-wrap gap-2 md:gap-5">
                {userObject?.address?.map((item, index) => (
                  <UserAddressCard
                    addressObj={item}
                    userObject={userObject}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
    </Container>
  );
};

export default UserProfilePage;
