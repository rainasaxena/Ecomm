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
      localStorage.setItem("authTokens", JSON.stringify(data));
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

//Function to get username and email
export const getUserDetails = async (username, email, accessToken) => {
  try {
    console.log("Get user details acess token:", accessToken);
    const res = await fetch("http://127.0.0.1:8000/get-user-details/", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ username: username, email: email }),
    });

    if (res.ok) {
      const userData = await res.json();
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: userData.user.username,
          email: userData.user.email,
        })
      );

      return userData.user;
    }
  } catch (e) {
    throw new Error("Failed to get full user details: ", e);
  }
};

//fucntion to get the username and email, first name, last name on login
export const userLogIn = async (username, password, accessToken) => {
  const user = {
    username: username,
    password: password,
  };

  try {
    const res = await fetch("http://127.0.0.1:8000/log-in/", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      const data = await res.json();
      return data.user;
    } else {
      console.error("Failed to get user details on login");
    }
  } catch (error) {
    console.error("Error during user detail retrieval on login");
  }
};

//Fucntion to verify the tokens
export const checkTokenValidity = async () => {
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const accessToken = authTokens["access"];
  const refreshToken = authTokens["refresh"];

  if (!accessToken || !refreshToken) {
    return false;
  }

  // verifying token
  try {
    const res = await fetch("http://127.0.0.1:8000/api/token/verify/", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: accessToken }),
    });

    if (res.ok) {
      return true;
    } else {
      const refreshResponse = await fetch(
        "http://127.0.0.1:8000/api/token/refresh/",
        {
          method: "POST",
          credentials: "same-origin",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );

      if (refreshResponse.ok) {
        const data = await res.json();
        localStorage.setItem("authTokens", JSON.stringify(data));
        return true;
      } else {
        // localStorage.setItem("authTokens", null);
        // localStorage.setItem("user", null);
        logOutUser();
        window.location.reload();

        return false;
      }
    }
  } catch (error) {
    console.log("Error in validating tokens");
    throw new Error("Error in validating tokens");
  }
};

//function for logout
export const logOutUser = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("authTokens");
};

//Function for signup
export const registerUser = async (userObject) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/sign-up/", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to create user");
    }
  } catch (error) {
    console.error("User was not created!");
    return null;
  }
};

//function to update user details
export const updateUserProfile = async (userObject) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/update-user-profile/", {
      method: "PATCH",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to update user details");
    }
  } catch (error) {
    console.error("User details were not updated!");
    return null;
  }
};
