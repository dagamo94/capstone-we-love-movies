const knex = require("../../db/connection");

function list() {
    return knex("reviews")
        .select("*");
}

function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({ review_id })
        .first();
}

function create(newReview) {
    return knex("reviews")
        .insert(newReview)
        .returning("*")
        .then(rows => rows[0]);
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")
        .then(rows => rows[0]);
}

function destroy(review_id) {
    return knex("reviews")
        .where({ review_id })
        .del();
}

module.exports = {
    list,
    read,
    create,
    update,
    destroy
}