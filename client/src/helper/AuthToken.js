class AuthToken {
  // Set authToken and email in localStorage
  static setToken(token, email) {
    
    localStorage.setItem("authToken", token);
    localStorage.setItem("email", email);
  }

  // Get authToken from localStorage
  static getToken() {
    return localStorage.getItem("authToken");
  }

  // Get email from localStorage
  static getEmail() {
    return localStorage.getItem("email");
  }

  // Validate if the token exists
  static isValidToken() {
    const token = AuthToken.getToken();
    return token && token !== null && token !== ''; // You can extend this with further validation if needed
  }

  // Validate if the email exists
  static isValidEmail() {
    const email = AuthToken.getEmail();
    return email && email !== null && email !== ''; // You can add further validation like regex if needed
  }

  // Clear the authToken and email from localStorage
  static clearToken() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
  }
}

export default AuthToken;
