// const getJWTTokens = async (username, password) => {
//   const user = {
//     username: username,
//     password: password,
//   };

//   const response = await fetch("http://127.0.0.1:8000/api/token/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify({ username, password }),
//   })

//     const data = response.json();

//   //   console.log(data);

//   return data;
// };

// const data = getJWTTokens("vishal_rk1", "123");

// console.log('print1',data)

const getJWTTokens = async (username, password) => {
    const user = {
      username: username,
      password: password,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Failed to get JWT tokens');
        // Handle error, throw an exception, etc.
      }
    } catch (error) {
      console.error('Error during token retrieval:', error);
      // Handle error, throw an exception, etc.
    }
  };
  
  // Since getJWTTokens is asynchronous, you should use it within an async function or use .then() syntax
  const fetchData = async () => {
    const data = await getJWTTokens("vishal_rk1", "123");
    console.log('print1', data);
  };
  
  // Call the async function
  fetchData();
  