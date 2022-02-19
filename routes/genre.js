const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const Genre = require("../database/models/Genre");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Cargar Genero
router.post("/genre", (req, res) => {
  Genre.create({
    imagen: req.body.imagen,
    nombre: req.body.nombre,
  }).then((genre) => {
    res.json(genre);
  });
});

// GET Generos
router.get("/genre", (req, res) => {
  Genre.findAll().then((genre) => {
    res.json(genre);
  });
});

//Update Genre

router.put("/genre", (req, res) => {
  Genre.update({
    imagen: req.body.imagen,
    nombre: req.body.nombre,
  }).then((genre) => {
    res.json(genre);
  });
});

// Delete Genero
router.delete("/genre/:id", (req, res) => {
  Genre.destroy({
    where: {
      id: req.params.id,
    },
  }).then((genre) => {
    res.json("Eliminado");
  });
});

module.exports = router;
