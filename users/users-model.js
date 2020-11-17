const db = require("../data/dbConfig.js");

module.exports = {
    add,
    getAll,
    findById,
    findBy,
    findClassesByInstructor
}

async function add(user){
    const [id] = await db('users').insert(user)
    return db('users').where({id}).first()
}

function getAll(){
    return db('users')
}

function findById(id){
    return db('users').where({id}).first()
}
function findBy(filter){
    return db('users').where(filter).orderBy("id")
}

function findClassesByInstructor(instructor_id){
    return db('classes').where({instructor_id})
}