export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('user'));
  
    if (token) {
      // Send the token to access protected sources
      return { 'x-auth-token': token };
    } else {
      return {};
    }
};