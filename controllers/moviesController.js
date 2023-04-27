const { moviesModel } = require("../models")
const express = require("express");
const router = express.Router();

router.get('/', async(req, res) => {
    const data = await moviesModel.find({});

    res.send({ data });
});

router.get('/:id', async(req, res) => {
    const { params } = req;
    const { id } = params;
    const data = await moviesModel.findById(id);
    res.send(data);
});

router.delete('/:id', async(req, res) => {
    const { params } = req;
    const { id } = params;
    const data = await moviesModel.findByIdAndDelete(id);
    res.send(data);
});

router.post('/create', async(req, res) => {
    const { query } = req;
    const data = await moviesModel.create(query);
    res.send(data);
});

module.exports = router;