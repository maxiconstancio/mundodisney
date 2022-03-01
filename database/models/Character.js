const  { Model, DataTypes }  = require('sequelize');
const sequelize = require('../db');

class Character extends Model {}

Character.init({

    picture:DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.STRING,
    weight: DataTypes.STRING,
    history: DataTypes.STRING,
    movie: {
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