const express = require("express");
const router = express.Router();
const { usersModel, moviesModel } = require('../models');
const { render } = require("pug");
const session = require("express-session");

router.get('/', async(req, res) => {
    const data = await usersModel.find({});
    res.send({ data });
});

router.post('/create', async(req, res) => {
    const { query } = req;
    const data = await usersModel.create({...query, movies: [] });
    res.send(data);
});

router.get('/:id', async(req, res) => {
    const { params } = req;
    const { id } = params;
    const data = await usersModel.findById(id);
    res.send(data);
});

router.post('/login', async(req, res) => {
    const userData = req.body;
    const movies = await moviesModel.find({});

    const users = await usersModel.find({ email: userData.email });
    if (users.length && users[0].password === userData.password) {
        req.session.email = userData.email;
        res.render('home', { message: 'Sesion iniciada con exito!', movies, session: req.session });
    } else {
        res.render('login', { message: 'Email o password incorrectos' });
    }
});

router.post('/admin-login', async(req, res) => {
    const userData = req.body;
    const movies = await moviesModel.find({});

    const users = await usersModel.find({ email: userData.email });
    if (users.length && users[0].password === userData.password && users[0].role[0] === 'admin') {
        req.session.email = userData.email;
        req.session.role = 'admin';
        res.render('home', { message: 'Sesion iniciada con exito!', movies, session: req.session });
    } else {
        res.render('admin-login', { message: 'Admin incorrecto.' });
    }
});

router.post("/signup", async(req, res) => {
    const userData = req.body;
    const user = await usersModel.find({ email: userData.email });
    if (user.length) {
        res.render("signup", { message: 'Este email ya existe.' });
    } else {
        const data = await usersModel.create({...userData, role: 'user' });
        res.render("login", { message: 'Usuario creado con exito.' });
    }
});

router.post('/logout', async(req, res) => {
    const movies = await moviesModel.find({});
    req.session.destroy();
    res.render("home", { message: 'Sesion terminada con exito.', movies, session: { email: '' } });
});

router.post('/add', async(req, res) => {
    const data = req.body;
    const id = data.id;
    const movies = await moviesModel.find({});
    if (req.session.email) {
        const users = await usersModel.find({ email: req.session.email });
        users[0].savedMovies.push(id);
        users[0].save();
        res.render('home', { message: 'Pelicula guardada con exito.', movies, session: req.session });
    } else {
        res.render('login', { message: 'Inicia session para agregar peliculas.' });
    }
});

router.post('/delete/:id', async(req, res) => {
    const data = req.body;
    const id = data.id;
    const movies = await movies.deleteOne({_id: id})
});
module.exports = router;