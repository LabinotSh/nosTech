

export const SIGNIN = "SIGN_IN";

export const Signin = (username, password) => (
    {   
        payload : SIGNIN,
        username : username,
        password : password
    
})