class AuthToken {
    // Set authToken in localStorage
    static setToken(token) {
      localStorage.setItem("authToken", token);
    }
  
    // Get authToken from localStorage
    static getToken() {
      return localStorage.getItem("authToken");
    }
  
    // Validate if the token exists
    static isValidToken() {
      const token = AuthToken.getToken();
      return token && token !== null && token !== ''; // You can extend this with further validation if needed
    }
  
    // Clear the authToken from localStorage
    static clearToken() {
      localStorage.removeItem("authToken");
    }
  }
  
  export default AuthToken;
  