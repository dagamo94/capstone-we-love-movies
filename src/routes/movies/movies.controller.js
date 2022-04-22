const service = require("./movies.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function movieExists(req, res, next){
    const {movieId} = req.params;
    const movie = await service.read(movieId);

    if(movie){
        res.locals.movie = movie;
        return next();
    }

    next({status: 404, message: `Movie with ID: ${movieId} not found`});
}

async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}

function read(req, res) {
    res.json({ data: res.locals.movie });
}

async function create(req, res) {
    const { data } = req.body;
    const createdMovie = await service.create(data);
    res.status(201).json({data: createdMovie});
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists),asyncErrorBoundary(read)],
    create: [asyncErrorBoundary(create)]
}