const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
  enrollAttendee,
  getAttendeesByClass,
  removeAttendee
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
  return db('classes as c').join("users","c.instructor_id","users.id").select(
    "users.username as instructor",
    "c.id",
    "c.class_name",
    "c.type",
    "c.start_time",
    "c.end_time",
    "c.intensity",
    "c.location",
    "c.enrolled",
    "c.max_size",
  );
}



// find a class with the specified id
//Joins the attendees that match
function findById(id) {
  return db("classes as c").where({"c.id":id}).first()
  .join("users","c.instructor_id","users.id")
  .select(
    "users.username as instructor",
    "c.id",
    "c.class_name",
    "c.type",
    "c.start_time",
    "c.end_time",
    "c.intensity",
    "c.location",
    "c.enrolled",
    "c.max_size",
  );
}

// ATTENDEES ENDPOINTS
async function enrollAttendee(user_id,class_id){
  const [id] = await db("attendees_by_class").insert({user_id,class_id})
  // const newAttendee = await db.insert("attendees_by_class as a").where({id}).join("users","a.user_id","users.id")
  // const total = await db("attendees_by_class").
  // const classObj = await db("classes").where({class_id}).first()
  // await db("classes").where({id:classObj.id}).update({enrolled:classObj.enrolled+1})
  return id
}
async function getAttendeesByClass(class_id){
  const attendeesArr = await db("attendees_by_class as a").where({class_id}).join("users","a.user_id","users.id").select("users.username")

  return attendeesArr
}

async function removeAttendee(user_id,class_id){
  const [id] = await db("attendee_by_class").where({user_id,class_id}).first()
  // const classObj = await db("classes").where({class_id}).first()
  // await db("classes").where({id:classObj.id}).update({enrolled:classObj.enrolled+1})
  return await db("attendees_by_class").where({id}).delete()
}
