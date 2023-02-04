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

        // req.user = await User.findOne({_id: decoded.id})

        next();
    }
    catch(e){
        return res.status(401).send('unauthorized');
    }

    var userId = decoded.id
    var user = await User.findOne({_id: userId})

}


module.exports = appendUser