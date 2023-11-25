import { React, useEffect, useState } from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import DropdownContainer from "../components/DropdownContainer";
import InfoContainer from "../components/InfoContainer";
import { Pen } from "lucide-react";

const UserProfilePage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({
      id: 34,
      username: "vishal_rk1",
      email: "karangalevr@gmail.com",
      first_name: "vishal",
      last_name: "Karangale",
      user_gender: "M",
      user_phone: "8208366282",
      user_pfp_url:
        "https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/user_pfp/vishal_rk-pfp.jpeg?",
      address: [
        {
          id: 8,
          address_type: "Home",
          address_line1: "Plot. 92, Dnyaneshwar Nagar, pipeline road",
          address_line2: "",
          city: "Ahmednagar",
          state: "Maharashtra",
          country: "India",
          postal_code: "414003",
          user_profile: 61,
        },
      ],
    });
  });

  return (
    <Container>
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
              src={user.user_pfp_url}
              alt=""
            />
          </div>

          <div className="mt-2 mb-2 text-sm md:text-base font-bold">
            {user.first_name} {user.last_name}
          </div>

          <Button
            buttonText="Edit Profile"
            component={<Pen size={15} />}
          ></Button>
        </div>

        <div className="md:flex md:flex-col md:w-full">
          <InfoContainer labelText="Username" inputText={user.username} />
          <InfoContainer labelText="Email" inputText={user.email} />
          <InfoContainer
            labelText="Mobile Number"
            inputText={user.user_phone}
          />
          <DropdownContainer labelText="Addresses" />
          <InfoContainer labelText="Username" inputText={user.username} />
        </div>
      </div>
    </Container>
  );
};

export default UserProfilePage;
