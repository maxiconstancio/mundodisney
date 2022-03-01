const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const authenticateToken = require("../controllers/authenticateToken");
const Genres = require("../database/models/Genres");
const Movie = require("../database/models/Movie");
const asociation = require('../database/asociations')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Cargar Genero
router.post("/genre", authenticateToken,(req, res) => {
  Genres.create({
    picture: req.body.picture,
    name: req.body.name,
    
  }).then((genre) => {
    res.json(genre);
  });
});

// GET Generos
router.get("/genre",authenticateToken, (req, res) => {
  Genres.findAll().then((genre) => {
      
    res.json(genre);
  });
});

//Update Genre

router.put("/genre",authenticateToken, (req, res) => {
  Genres.update({
    imagen: req.body.imagen,
    nombre: req.body.nombre,
  }).then((genre) => {
    res.json(genre);
  });
});

// Delete Genero
router.delete("/genre/:id", authenticateToken, (req, res) => {
  Genres.destroy({
    where: {
      id: req.params.id,
    },
  }).then((resp) => {
    if (resp==0) {
      res.status(404).send("No se encuentra el genero a eliminar")
    } else {res.status(410).send("Eliminado")}
    
  })
  .catch(err => {
      res.send(err);
  });
});

module.exports = router;
