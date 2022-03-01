const  { Model, DataTypes }  = require('sequelize');
const sequelize = require('../db');

class Movie extends Model {}

Movie.init({
    
    picture:DataTypes.STRING,
    name: DataTypes.STRING,
    premiere: DataTypes.DATE,
    rate: DataTypes.INTEGER,
    genre: {
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