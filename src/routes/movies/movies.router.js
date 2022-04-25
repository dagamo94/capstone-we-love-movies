const router = require("express").Router({mergeParams: true});
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


//  ************* IMPLEMENT WITH TABLE JOINS IN A SERVICE FILE????
// Make sure to adjust controller to handle these requests
router.route("/:movieId/theaters").get(theatersController.list);

router.route("/:movieId/critics").get(reviewsController.list);

module.exports = router;