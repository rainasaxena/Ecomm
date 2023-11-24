import {React, useEffect, useState} from 'react'
import Container from '../components/Container'
import Button from "../components/Button";
import InfoContainer from "../components/InfoContainer";
import {Pen} from 'lucide-react'


const UserProfilePage = () => {
    
    const [user, setUser] = useState({});

    useEffect(()=>{
        setUser({
            "id": 51,
            "username": "test-2",
            "email": "test2@gmail.com",
            "first_name": "test",
            "last_name": "user",
            "user_gender": "M",
            "user_phone": "8208366283",
            "user_pfp": "/main/images/user_pfp/pizza-4_GaPkwcW.jpg",
            "user_pfp_url": "https://cdztpolwphkawmvkmrei.supabase.co/storage/v1/object/public/Images/user_pfp/pfp.jpg",
            "address": [
                {
                    "id": 2,
                    "address_type": "Home",
                    "address_line1": "Plot. 99, Lol Nagar, fuk chowk",
                    "address_line2": "",
                    "city": "Ahmednagar",
                    "state": "Maharashtra",
                    "country": "India",
                    "postal_code": "414003",
                    "user_profile": 54
                }
            ]
        })
    })

  return (

    <Container>
        <div className='border-b h-16 md:h-20 flex items-center justify-start'>
            <div className='m-auto text-sm md:text-base font-bold'>Profile Details</div>
        </div>

        <div className="mt-8 mb-8 flex flex-col items-center justify-center">
            <div className="bg-black h-32 w-32 rounded-full overflow-hidden">
                <img className='w-full h-full object-cover' src={user.user_pfp_url} alt="" />
            </div>

            <div className="mt-2 mb-2 text-sm font-bold">{user.first_name} {user.last_name}</div>

            <Button buttonText='Edit Profile' component={<Pen size={15}/>}></Button>

        </div>
        

        <InfoContainer labelText='Username' inputText={user.username}/>
        <InfoContainer labelText='Email' inputText={user.email}/>
        <InfoContainer labelText='Mobile Number' inputText={user.user_phone}/>
        <InfoContainer labelText='Addresses' inputText={user.username}/>
        <InfoContainer labelText='Username' inputText={user.username}/>
        
        
        
            



      




    </Container>
    
  )
}

export default UserProfilePage