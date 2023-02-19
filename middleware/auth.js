require('dotenv').config();
const User = require('../model/user')
const jwt = require('jsonwebtoken')

const addTokenToHeader = async (req, res, next) => {
    // Get the token from the request object, assuming it was stored in the `token` property
    const token = await req.token;
    console.log(token)
    
    // If a token exists, add it to the Authorization header
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    
    // Call the next middleware function in the chain
    next();
}
  


const appendUser = async (req, res, next) => {
    let token;
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //set token from bearer token in header
        token = req.headers.authorization.split(' ')[1]
    }

    try {
        decoded = jwt.verify(token, process.env.TOKEN_KEY)
 
        const userId = decoded.user_id

        const user = await User.findOne({_id: userId})
        req.user = user

        next();
    }
    catch(e){
        console.log(e)
        return res.status(401).send('unauthorized');
        
    }

}


module.exports = {appendUser, addTokenToHeader}