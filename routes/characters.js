const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./process.env" });

const Character = require("../database/models/Character");
const Movie = require("../database/models/Movie");

const authenticateToken = require("../controllers/authenticateToken");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Crear Personaje
router.post("/characters", authenticateToken, (req, res) => {
  Character.create({
    picture: req.body.picture,
    name: req.body.name,
    age: req.body.age,
    weight: req.body.weight,
    history: req.body.history,
    movie: req.body.movie,
  }).then((character) => {
    res.json(character);
  });
});

//Consultar Personaje

router.get("/characters", authenticateToken, (req, res) => {
  console.log(req.query);
  let reqQuery = {};

  /* si se filtra por nombre, edad, peso o pelicula muestra detalle de cada uno de los personajes 
  sino muestra solo Imagen y Nombre*/
  if (Object.keys(req.query).length > 0) {
    reqQuery = {
      where: req.query,
      include: {
        model: Movie,
        as: "movieId",
        attributes: ["name"],
      },
    };
  } else {
    reqQuery = { attributes: ["picture", "name"] };
  }

  Character.findAll(reqQuery).then((characters) => {
    res.json(characters);
  }).catch(error => {
    res.sendStatus(500, error)
  });
});

//Update Personaje

router.put("/characters/:id", authenticateToken, (req, res) => {
  let reqQuery = req.body;
  Character.update(reqQuery, {
    where: {
      id: req.params.id,
    },
  }).then((character) => {
    res.json(character);
  }).catch(error => {
    res.sendStatus(500, error)
  });
});

//Delete Character

router.delete("/characters/:id", authenticateToken, (req, res) => {
  Character.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.sendStatus(410,"Eliminado")
    //res.json("Eliminado");
  }).catch(error => {
    res.sendStatus(500, error)
  });
});
module.exports = router;
