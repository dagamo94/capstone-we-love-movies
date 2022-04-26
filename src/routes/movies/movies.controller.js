const service = require("./movies.service");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);

    if (movie) {
        res.locals.movie = movie;
        return next();
    }

    next({ status: 404, message: `Movie cannot be found.` });
}

async function list(req, res) {
    const { is_showing } = req.query;
    if (is_showing === "true") {
        const data = await service.listShowing();
        res.json({ data });
    } else {
        const data = await service.list();
        res.json({ data });
    }
}

function read(req, res) {
    res.json({ data: res.locals.movie });
}

async function listReviews(req, res) {
    const { movieId } = req.params;
    const data = await service.listReviews(movieId);
    res.json({ data });
}

async function listTheaters(req, res) {
    const data = await service.listTheaters(req.params.movieId);
    res.json({ data });
}


module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
    listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)]
}