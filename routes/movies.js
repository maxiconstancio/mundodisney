const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const Movie = require("../database/models/Movie");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());





module.exports = router;
