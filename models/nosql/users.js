const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: ["user", "admin"],
        default: "user"
    },
    email: {
        type: String
    },
    savedMovies: {
        type: [String]
    },
    deleteMovies: {
        type: [String]
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model("users", userSchema)