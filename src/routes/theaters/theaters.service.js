const knex = require("../../db/connection");
const reduceProperties = require("../../utils/reduce-properties");

const addMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
})

function list(){
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select("t.*", "m.*")
        .then(addMovies);
        //.where({ is_showing: true })
        //.groupBy("t.theater_id")
}

function read(theater_id){
    return knex("theaters")
        .select("theater_id", "theater_name")
        .where({theater_id})
        .first();
}


module.exports = {
    list,
    read
}