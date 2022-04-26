const knex = require("../../db/connection");
const mapProperties = require("../../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at"
});

function list(){
    return knex("movies")
        .select("movie_id as id", "title", "runtime_in_minutes", "rating", "description", "image_url");
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

function listShowing(){
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select("m.movie_id as id", "title", "runtime_in_minutes", "rating", "description", "image_url")
        .where({"mt.is_showing": true})
        .groupBy("m.movie_id");
}

function listTheaters(movie_id){
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("t.*", "mt.is_showing", "m.movie_id")
        .where({"m.movie_id": movie_id, "mt.is_showing": true});
}

function listReviews(movie_id){
    return knex("movies as m")
        .join("reviews as r", "r.movie_id", "m.movie_id")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*")
        .where({"m.movie_id": movie_id})
        .then(rows => rows.map(row => addCritic(row)))
}

module.exports = {
    list,
    read,
    create,
    listTheaters,
    listReviews,
    listShowing
}