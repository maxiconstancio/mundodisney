const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const authenticateToken = require("../controllers/authenticateToken");
const Genre = require("../database/models/Genre");
const Movie = require("../database/models/Movie");
const asociation = require('../database/asociations')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Cargar Genero
router.post("/genre", authenticateToken,(req, res) => {
  Genre.create({
    imagen: req.body.imagen,
    nombre: req.body.nombre,
  }).then((genre) => {
    res.json(genre);
  });
});

// GET Generos
router.get("/genre",authenticateToken, (req, res) => {
  Genre.findAll({
      include: {
          model: Movie,
          attributes: ['titulo']
      }}
  ).then((genre) => {
      
    res.json(genre);
  });
});

//Update Genre

router.put("/genre",authenticateToken, (req, res) => {
  Genre.update({
    imagen: req.body.imagen,
    nombre: req.body.nombre,
  }).then((genre) => {
    res.json(genre);
  });
});

// Delete Genero
router.delete("/genre/:id", authenticateToken, (req, res) => {
  Genre.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => res.json("Eliminado")).catch(err => {
      res.send(err);
  });
});

module.exports = router;
