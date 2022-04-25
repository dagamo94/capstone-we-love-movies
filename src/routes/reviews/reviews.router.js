const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../../errors/methodNotAllowed");

router
    .route("/:reviewId")
    .patch(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

module.exports = router;