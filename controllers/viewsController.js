const express = require("express");
const router = express.Router();
const { moviesModel, usersModel } = require("../models")

router.get("/", async(req, res) => {
    const movies = await moviesModel.find({});
    const session = req.session;
    res.render("home", { movies, session });
});

router.get('/users/login', async(req, res) => {
    const movies = await moviesModel.find({});
    if (req.session.email) {
        res.redirect('/', { message: 'Ya existe una sesion activa!', movies, session: req.session });
    }

    res.render('login');
});

router.get('/users/signup', async(req, res) => {
    session = req.session
    const movies = await moviesModel.find({});
    if (session.email) {
        res.render('home', { message: 'Ya existe una sesion activa!', movies, session });
    }

    res.render("signup");
});

router.get('/admin/login', async(req, res) => {
    session = req.session
    const movies = await moviesModel.find({});
    if (session.email) {
        res.render('home', { message: 'Ya existe una sesion activa!', movies, session });
    }

    res.render("admin-login");
});

router.get('/users/my-movies', async(req, res) => {
    const allMovies = await moviesModel.find({});
    // console.log('hola');
    if (!req.session.email) {
        res.render('login', { message: 'Inicia sesion primero!', movies: allMovies, session: req.session });
    } else {
        const users = await usersModel.find({ email: req.session.email });
        const myMovies = users[0].savedMovies;
        let movies = [];
        for (let i = 0; i < myMovies.length; i++) {
            const movie = await moviesModel.find({ _id: myMovies[i] });
            movies.push(movie[0]);
        }
        res.render('my-movies', { movies });
    }
});

module.exports = router;