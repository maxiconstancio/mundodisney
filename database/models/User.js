const  { Model, DataTypes }  = require('sequelize');
const sequelize = require('../db');

class User extends Model {}

User.init({
    
    email:DataTypes.STRING,
    nombre: DataTypes.STRING,
    password: DataTypes.STRING
   
}, {
        sequelize,
        modelName: "user"
    });



module.exports = User;