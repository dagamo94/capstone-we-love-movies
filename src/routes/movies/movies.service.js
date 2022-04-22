const knex = require("../../db/connection");

function list(){
    return knex("movies")
        .select("*");
}

function read(movieId){
    return knex("movies")
        .select("*")
        .where({movie_id: movieId})
        .first();
}

function create(newMovie){
    return knex("movies")
        .insert(newMovie)
        .returning("*")
        .then(rows => rows[0]);
}

module.exports = {
    list,
    read,
    create
}