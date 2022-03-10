const  { Model, DataTypes }  = require('sequelize');
const sequelize = require('../db');

class User extends Model {}

User.init({
    
    email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Email already exist'
            },
            validate: {
                isEmail: {
                    msg: 'Invalid email'
                },
                notEmpty: {
                    msg: 'Email is required'
                }
            }
        },
    nombre: DataTypes.STRING,
    password: DataTypes.STRING
   
}, {
        sequelize,
        modelName: "user"
    });



module.exports = User;