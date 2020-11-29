export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('user'));
  
    if (token) {
      // for Node.js Express back-end
      return { 'x-auth-token': token };
    } else {
      return {};
    }
};