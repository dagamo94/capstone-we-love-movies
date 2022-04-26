const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const theatersController = require("../theaters/theaters.controller");
const reviewsController = require("../reviews/reviews.controller");
const methodNotAllowed = require("../../errors/methodNotAllowed");

router
    .route("/")
    .get(controller.list)
    // .post(controller.create)
    .all(methodNotAllowed);

router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

router
    .route("/:movieId/theaters")
    .get(controller.listTheaters)
    .all(methodNotAllowed);

router
    .route("/:movieId/reviews")
    .get(controller.listReviews)
    .all(methodNotAllowed);


module.exports = router;