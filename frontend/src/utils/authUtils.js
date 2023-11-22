export const getJWTTokens = async (username, password) => {
  const user = {
    username: username,
    password: password,
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to get JWT tokens");
    }
  } catch (error) {
    console.error("Error during token retrieval:", error);
    return null;
  }
};

export const fetchData = async (username, password) => {
  const data = await getJWTTokens(username, password);
  // console.log(data)
  return data;
};


//Function for login
export const getUserDetails = async (username, password, accessToken) => {
  const user = {
    username: username,
    password: password,
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/log-in/", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to get JWT tokens");
    }
  } catch (error) {
    console.error("Error during token retrieval:", error);
    return null;
  }
};


//Function for signup
export const registerUser = async (userObject) => {
 
  try{
    const response  = await fetch("http://127.0.0.1:8000/sign-up/", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    });

    if (response.ok){
      const data = await response.json();
      return data;
    } else{
      console.error("Failed to create user")
    }
  } catch (error){
    console.error("User was not created!");
    return null;
  }
}


//function to update user details
export const updateUserProfile = async (userObject) => {
 
  try{
    const response  = await fetch("http://127.0.0.1:8000/update-user-profile/", {
      method: "PATCH",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    });

    if (response.ok){
      const data = await response.json();
      return data;
    } else{
      console.error("Failed to update user details")
    }
  } catch (error){
    console.error("User details were not updated!");
    return null;
  }
}
