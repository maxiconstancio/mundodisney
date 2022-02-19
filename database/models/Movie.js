const  { Model, DataTypes }  = require('sequelize');
const sequelize = require('../db');

class Movie extends Model {}

Movie.init({
    
    imagen:DataTypes.STRING,
    titulo: DataTypes.STRING,
    createAt: DataTypes.DATE,
    rate: DataTypes.INTEGER,
    genre: DataTypes.INTEGER
   
}, {
        sequelize,
        modelName: "movie"
    });



module.exports = Movie;