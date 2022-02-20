const  { Model, DataTypes }  = require('sequelize');
const sequelize = require('../db');

class Character extends Model {}

Character.init({

    imagen:DataTypes.STRING,
    nombre: DataTypes.STRING,
    edad: DataTypes.STRING,
    peso: DataTypes.STRING,
    historia: DataTypes.STRING,
    peliculasId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'movies',
            key: 'id'
        } 
   } 
    
}, {
        sequelize,
        modelName: "characters"
    });



module.exports = Character;