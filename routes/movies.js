const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const authenticateToken = require("../controllers/authenticateToken");
const Movie = require("../database/models/Movie");
const Genre = require("../database/models/Genre");
const Character= require("../database/models/Character");
const asociation = require('../database/asociations');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Cargar Pelicula
router.post("/movies",authenticateToken, (req, res) => {
    Movie.create({
      imagen: req.body.imagen,
      titulo: req.body.titulo,
      createAt: req.body.createAt,
      rate: req.body.rate,
      genreId: req.body.genreId
    }).then((movie) => {
      res.json(movie);
    });
  });


  // GET MOVIES
  router.get("/movies",authenticateToken, (req, res) => {
    let condicion = {};
    let orderMovies=['id', 'ASC']
    if (req.query.hasOwnProperty("name")) {
      condicion = { titulo: req.query.name };
    } else if (req.query.hasOwnProperty("genre")) {
      condicion = { genreId: req.query.genre };
    } else if (req.query.hasOwnProperty("order")) {
      orderMovies = [ 'rate', req.query.order ];
    } else {
      condicion = null;
    }
  
  
    Movie.findAll({
      where: condicion,
      attributes: ["imagen", "titulo","createAt"],
      include: [{
        model: Genre,
        attributes: ['nombre']
      }, {
        model: Character,
        attributes: ['nombre']
      }],
      order: [orderMovies]
    }).then((movies) => {
      res.json(movies);
    });
  });

  //UPDATE

  router.put("/movies/:id",authenticateToken, (req, res) => {
    Movie.update(
      {
        imagen: req.body.imagen,
        titulo: req.body.titulo,
        createAt: req.body.createAt,
        rate: req.body.rate,
        genreId: req.body.genreId
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
