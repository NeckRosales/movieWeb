const { check } = require("express-validator");
const { validateResults } = require("../funcion/comprobacion");

const createMovieValidator = [
    check("nombre")
    .exists()
    .notEmpty(),
    check("autor")
    .exists()
    .notEmpty(),
    check("año")
    .exists()
    .notEmpty(),
    check("actores")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { createMovieValidator };