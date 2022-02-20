const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
require('dotenv').config({ path: '.env'});
 
const login = require('../controllers/authController')
const User = require("../database/models/User");


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.use(express.json());

router.post('/auth/register', async (req,res)=> {
    const salt = await bcrypt.genSalt();
    const hashedPassword =  await bcrypt.hash(req.body.password, salt)
    
    User.create({
        nombre: req.body.nombre,
        email: req.body.email,
        password: hashedPassword

    }).then((user) => {
    res.json(user);
  });
})


//Compare Password
router.post('/auth/login',login);


module.exports = router;
