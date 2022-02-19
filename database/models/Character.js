const  { Model, DataTypes }  = require('sequelize');
const sequelize = require('../db');

class Character extends Model {}

Character.init({

    imagen:DataTypes.STRING,
    nombre: DataTypes.STRING,
    edad: DataTypes.STRING,
    peso: DataTypes.STRING,
    historia: DataTypes.STRING,
    peliculas: DataTypes.INTEGER 
}, {
        sequelize,
        modelName: "character"
    });



module.exports = Character;