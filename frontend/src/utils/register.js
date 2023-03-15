import axios from "axios";
import getAuthHeaders from "./getAuthHeaders";
import validateStatus from "./validateStatus";

const registerUser = async ({username, email, password}) => {
    try {
    const response = await axios.post('http://localhost:3000/register', {
      username, email, password
    }, {
      validateStatus:validateStatus(),
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });
  
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export default registerUser;