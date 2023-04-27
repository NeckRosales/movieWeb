const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
    nombre: {
        type: String
    },
    autor: {
        type: String
    },
    anio: {
        type: Number
    },
    actores: {
        type: [String]
    },
}, {
    timestamps: true,
    versionkey: false
});

module.exports = mongoose.model("peliculas", moviesSchema)