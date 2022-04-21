const service = require("./movies.service");

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

async function read(req, res) {
    const { movieId } = req.params;
    const data = await service.read(movieId);
    res.json({ data });
}

async function create(req, res) {
    const { data } = req.body;
    const createdMovie = await service.create(data);
    res.status(201).json({data: createdMovie});
}

module.exports = {
    list,
    read,
    create
}