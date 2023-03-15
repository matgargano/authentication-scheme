import axios from "axios";
import getAuthHeaders from "./getAuthHeaders";
import validateStatus from "./validateStatus";

const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        method: 'POST',
        validateStatus:validateStatus(),
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          // expiresInMins: 60, // optional
        }),
      });
  
     
  
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export default loginUser;