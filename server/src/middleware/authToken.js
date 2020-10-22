const jwt = require('jsonwebtoken');
const {refreshTokens} = require('../data/refreshTokens');

function generateAccessToken(user){
    return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, 
    {expiresIn: '120s'});
}

function generateRefreshToken(user){
    return jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '86400s'});
}

//Verify the token
verify = function(req, res, next){

    //Getting the token either from headers or cookie
    // const token = req.header('auth-token');
    // if(!token) return res.status(401).send('Access Denied!');
    let token = req.cookies.jwt;
    //if there is no token stored in cookies, the request is unauthorized
    if (!token){
        return res.status(403).send()
    }
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        let user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = user;
        next()
    }
    catch (error) {
        res.status(400).send('Invalid Token!');
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verify
}