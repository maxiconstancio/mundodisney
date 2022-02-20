const jwt = require('jsonwebtoken') 
require('dotenv').config({path: './process.env'});
console.log(process.env.DATABASE)
function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split('')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=> {
        req.user = user
        next();
    })
    
}

module.exports = authenticateToken;