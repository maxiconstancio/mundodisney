const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const authenticateToken = require("../controllers/authenticateToken");
const Movie = require("../database/models/Movie");
const Genres = require("../database/models/Genres");
const Character= require("../database/models/Character");
const asociation = require('../database/asociations');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Cargar Pelicula
router.post("/movies",authenticateToken, (req, res) => {
    
    Movie.create({
      picture: req.body.picture , 
      name: req.body.name,
      premiere: req.body.premiere,
      rate: req.body.rate,
      genre: req.body.genre
    }).then((movie) => {
      res.json(movie);
    });
  });


  // GET MOVIES
  router.get("/movies",authenticateToken, (req, res) => {
    let condicion = {};
    let orderMovies=['id', 'ASC']
    
    if (Object.keys(req.query).length > 0) {
       if (req.query.hasOwnProperty("order")) {
        orderMovies = [ 'rate', req.query.order ];
      } else {
        condicion = req.query;
      }
     
    
      Movie.findAll({
        where: condicion,
        include: [{
          model: Genres,
          as: 'genreId',
          attributes: ['name']
        }, {
          model: Character,
          as: 'characterId',
          attributes: ['name']
        }],
        order: [orderMovies]
      }).then((movies) => {
        res.json(movies);
      });
    }
    else {
      Movie.findAll({attributes: ['picture', 'name', 'premiere']})
      .then((movies) => {
        res.json(movies)
      })
    }
    
    
  });

  //UPDATE

  router.put("/movies/:id",authenticateToken, (req, res) => {
    Movie.update(
      {
        picture: req.body.picture , 
      name: req.body.name,
      premiere: req.body.premiere,
      rate: req.body.rate,
      genre: req.body.genre
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((movie) => {
      res.json(movie);
    });
  });

  //DELETE
  router.delete("/movies/:id",authenticateToken, (req, res) => {
    Movie.destroy({
      where: {
        id: req.params.id,
      },
    }).then((movie) => {
      res.json("Eliminado");
    });
  });

module.exports = router;
