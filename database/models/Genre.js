const  { Model, DataTypes }  = require('sequelize');
const sequelize = require('../db');

class Genre extends Model {}

Genre.init({
    
    imagen:DataTypes.STRING,
    nombre: DataTypes.STRING,
    
   
}, {
        sequelize,
        modelName: "genres"
    });



module.exports = Genre;