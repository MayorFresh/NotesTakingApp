require('dotenv').config();
const User = require('../model/user')
const jwt = require('jsonwebtoken')

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


module.exports = appendUser