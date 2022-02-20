const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const authenticateToken = require("../controllers/authenticateToken");
const Movie = require("../database/models/Movie");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Cargar Pelicula
router.post("/movies",authenticateToken, (req, res) => {
    Movie.create({
      imagen: req.body.imagen,
      titulo: req.body.titulo,
      createAt: req.body.fechaCreacion,
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
    if (req.query.hasOwnProperty("name")) {
      condicion = { titulo: req.query.name };
    } else if (req.query.hasOwnProperty("genre")) {
      condicion = { genre: req.query.genre };
    } else if (req.query.hasOwnProperty("order")) {
      orderMovies = [ 'rate', req.query.order ];
    } else {
      condicion = null;
    }
  
  
    Movie.findAll({
      where: condicion,
      attributes: ["imagen", "titulo"],
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
        createAt: req.body.fechaCreacion,
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
