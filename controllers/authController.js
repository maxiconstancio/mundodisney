const User = require('../database/models/User')
const jwt = require('jsonwebtoken') 
const bcrypt = require('bcrypt')
function login (req,res) {

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(async (user) => {
        if (await bcrypt.compare(req.body.password, user.password)) {
            
           const accessToken = jwt.sign(user.nombre, process.env.ACCESS_TOKEN_SECRET)
    
            res.json({ accessToken})
    
        } else {
            res.statyssend('Not Allowed')
        }
    }).catch((err)=> res.send(err));

}



module.exports = login;