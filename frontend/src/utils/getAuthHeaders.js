import { TOKEN_NAME } from "./constants";

const getAuthHeaders = () => {
  const token = localStorage.getItem(TOKEN_NAME);
  debugger;
  if(!!token && "undefined" !== token) {
    return { 'Authorization': `Bearer ${token}` };
  }
    
    return {};
  };

  export default getAuthHeaders;