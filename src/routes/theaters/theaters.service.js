const knex = require("../../db/connection");

function list(){
    return knex("theaters")
        .select("*");
}

function read(theater_id){
    return knex("theaters")
        .select("theater_id", "theater_name")
        .where({theater_id})
        .first();
}

function create(newTheater){
    return knex("theaters")
        .insert(newTheater)
        .returning("*")
        .then(rows => rows[0]);
}

function update(updatedTheater){
    return knex("theaters")
        .select("*")
        .where({})
}

function destroy(theater){

}

module.exports = {
    list,
    read,
    create,
    destroy
}