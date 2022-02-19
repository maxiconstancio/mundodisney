const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const Character = require("../database/models/Character");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Crear Personaje
router.post("/characters", (req, res) => {
  Character.create({
    imagen: req.body.imagen,
    nombre: req.body.nombre,
    edad: req.body.edad,
    peso: req.body.peso,
    historia: req.body.historia,
    peliculas: req.body.peliculas,
  }).then((character) => {
    res.json(character);
  });
});

//Consultar Personaje

router.get("/characters", (req, res) => {
  let condicion = {};
  let queryData = req.query;

  if (req.query.hasOwnProperty("name")) {
    condicion = { nombre: req.query.name };
  } else if (req.query.hasOwnProperty("age")) {
    condicion = { edad: req.query.age };
  } else if (req.query.hasOwnProperty("movie")) {
    condicion = { peliculas: req.query.movie };
  } else {
    condicion = null;
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
    attributes: ["imagen", "nombre"],
  }).then((characters) => {
    res.json(characters);
  });
});

//Update Personaje

router.put("/characters/:id", (req, res) => {
  Character.update(
    {
      imagen: req.body.imagen,
      nombre: req.body.nombre,
      edad: req.body.edad,
      peso: req.body.peso,
      historia: req.body.historia,
      peliculas: req.body.peliculas,
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

router.delete("/characters/:id", (req, res) => {
  Character.destroy({
    where: {
      id: req.params.id,
    },
  }).then((character) => {
    res.json("Eliminado");
  });
});
module.exports = router;
