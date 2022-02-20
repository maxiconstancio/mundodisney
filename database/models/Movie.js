const  { Model, DataTypes }  = require('sequelize');
const sequelize = require('../db');

class Movie extends Model {}

Movie.init({
    
    imagen:DataTypes.STRING,
    titulo: DataTypes.STRING,
    createAt: DataTypes.DATE,
    rate: DataTypes.INTEGER,
    genreId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'genres',
                key: 'id'
            } 
    } 
   
}, {
        sequelize,
        modelName: "movies"
    });



module.exports = Movie;