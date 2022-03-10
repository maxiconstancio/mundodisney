const  { Model, DataTypes }  = require('sequelize');
const sequelize = require('../db');

// GENEROS
class Genres extends Model {}

Genres.init({
    
    picture:DataTypes.STRING,
    name: DataTypes.STRING,
    
   
}, {
        sequelize,
        modelName: "genres"
    });



module.exports = Genres;