const Genres = require('./models/Genres');
const Character = require('./models/Character');
const Movie = require('./models/Movie');


//Genero y Peliculas
Genres.hasMany(Movie, {as: 'genreId', foreignKey: 'genre'});
Movie.belongsTo(Genres, {as: 'genreId',foreignKey: 'genre' });


//Personajes y Peliculas

Movie.hasMany(Character, {as: 'characterId', foreignKey:'movie' });
Character.belongsTo(Movie, {as: 'movieId',foreignKey:'movie'});
