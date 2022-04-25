const service = require("./reviews.service");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);

    if (review) {
        res.locals.review = review;
        return next();
    }

    next({ status: 404, message: `Review cannot be found` })
}

async function destroy(req, res) {
    await service.destroy(res.locals.review.review_Id);
    res.sendStatus(204);
}

async function update(req, res) {
    const updatedReview = {
        ...req.body.data,
        review_Id: res.locals.review.review_Id
    }
    const data = await service.update(updatedReview);

    res.json({ data });
}

module.exports = {
    delete: [reviewExists, destroy],
    update: [reviewExists, update]
}