const Genre = require('./models/Genre');
const Character = require('./models/Character');
const Movie = require('./models/Movie');


//Genero y Peliculas
Genre.hasMany(Movie, {foreignKey: 'genreId'});
Movie.belongsTo(Genre, {foreignKey: 'genreId' });


//Personajes y Peliculas

Movie.hasMany(Character, {foreignKey:'peliculasId'});
Character.belongsTo(Movie, {foreignKey:'peliculasId'});
