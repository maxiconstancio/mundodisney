const User = require('../database/models/User')
const jwt = require('jsonwebtoken') 
const bcrypt = require('bcrypt')


function login (req,res) {
    
    User.findOne({
        //Busca el usuario por la direccion de email
        where: {
            email: req.body.email
        }
    }).then(async (user) => {
        if (user != null) {
            
        if (await bcrypt.compare(req.body.password, user.password)) {
           
            // Si la contraseña es correcta, genera token y lo envia. 
           const accessToken = jwt.sign(user.nombre, process.env.ACCESS_TOKEN_SECRET)
            
            res.json({ accessToken})
    
        } else {
            res.status(403).send('Incorrect Password')
        }
    } else 
    {
        res.status(404).send("User doesn't exist")
        
    }
    }).catch((err)=> res.send(err));

}



module.exports = login;