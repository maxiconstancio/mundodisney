const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
require('dotenv').config({path: './process.env'});

const Character = require("../database/models/Character");

const authenticateToken = require("../controllers/authenticateToken");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Crear Personaje
router.post("/characters", authenticateToken,   (req, res) => {
  Character.create({
    imagen: req.body.imagen,
    nombre: req.body.nombre,
    edad: req.body.edad,
    peso: req.body.peso,
    historia: req.body.historia,
    peliculasId: req.body.peliculas,
  }).then((character) => {
    res.json(character);
  });
});

//Consultar Personaje

router.get("/characters",authenticateToken, (req, res) => {
  
  let condicion = {};
  let atributos = null;

  if (req.query.hasOwnProperty("name")) {
    condicion = { nombre: req.query.name };
  } else if (req.query.hasOwnProperty("age")) {
    condicion = { edad: req.query.age };
  } else if (req.query.hasOwnProperty("movies")) {
    condicion = { peliculasId: req.query.movies };
  } else {
    condicion = null;
    atributos = ["imagen", "nombre"];
  }

  /* switch (Object.keys(queryData)[0]) {
    case "name":
      console.log("aerewqr");
      condicion = { nombre: req.query.name };
      break;
    case "age":
      condicion = { edad: parseInt(req.query.age) };
      break;
    case "movie":
      condicion = { peliculas: req.query.movie };
      break;
    default:
      condicion = null;
      break;
  } */

  Character.findAll({
    where: condicion,
    attributes: atributos,
  }).then((characters) => {
    res.json(characters);
  });
});

//Update Personaje

router.put("/characters/:id",authenticateToken, (req, res) => {
  Character.update(
    {
      imagen: req.body.imagen,
      nombre: req.body.nombre,
      edad: req.body.edad,
      peso: req.body.peso,
      historia: req.body.historia,
      peliculasId: req.body.peliculas,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((character) => {
    res.json(character);
  });
});

//Delete Character

router.delete("/characters/:id",authenticateToken, (req, res) => {
  Character.destroy({
    where: {
      id: req.params.id,
    },
  }).then((character) => {
    res.json("Eliminado");
  });
});
module.exports = router;
