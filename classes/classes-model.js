const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getByInstructor,
  findById,
};

// async, adds a nwe class and then returns the new class obj added
async function insert(newClass) {
  const [id] = await db('classes').insert(newClass)
  return db('classes').where({ id }).first()
  // return await db('classes').insert(newClass)
}

//async, updates the class based on the id sent in and the changes
async function update(id, changes) {
  await db('classes').update(changes).where({ id })
  return db('classes').where({ id }).first()
}

//deletes a class that has the id passed in
function remove(id) {
  return db('classes').where({ id }).delete()
}

// gets all of the classes returned JOINED with the attendies matching it
function getAll() {
  return db('classes');
}

// gets all of the classes back that match the instructor id. 
//JOINS the attentees that match them
function getByInstructor(instructorId){
    
}

// find a class with the specified id
//Joins the attendees that match
function findById(id) {
  return db("classes").where({id}).first();
}
