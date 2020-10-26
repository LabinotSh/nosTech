//Ex..your order = actions

//krejt actions 

export const REGISTER = "REGISTER"
export const SIGNIN = "SIGN_IN";

export const Signin = (username, password) => (
    {   
        payload : SIGNIN,
        username : username,
        password : password
    
})

export const Register = (email, password) => (
    {
        payload : REGISTER,
        email : email,
        password : password
    }
)