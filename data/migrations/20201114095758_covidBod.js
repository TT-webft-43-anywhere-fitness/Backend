/*
    Tables
    Users
        id
        username
        password
        role
    Classes
        id
        name
        type
        start time
        duration
        intensity level
        location
        numAttendies
        maxClassSize
        instructorId
        instructorName
        isFull
    attendiesByClass
        id
        classId
        userId
*/
const { table } = require("../dbConfig");

exports.up = function(knex) {
    return knex.schema
        .createTable("roles", tbl => {
            tbl.increments();
      
            tbl.string("role_name", 128).notNullable().unique();
          })
        .createTable("users", tbl => {
        tbl.increments();
    
        tbl.string("username", 128).notNullable().unique().index();
        tbl.string("password", 256).notNullable();
    
        tbl.integer("role")
            .unsigned()
            .references("roles.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    })
    .createTable("classes", tbl => {
        tbl.increments();
        tbl.string("class_name",)
            .notNullable()
            .unique()
            .index();
        tbl.string("type").notNullable();
        tbl.time('start_time').notNullable();
        tbl.time("end_time").notNullable();
        tbl.integer("intensity").unsigned().notNullable();
        tbl.string("location").notNullable();
        tbl.integer("num_attendies").unsigned().notNullable();
        tbl.integer("max_size").unsigned().notNullable();
        tbl.integer("instructor_id")
            .unsigned()
            .references("users.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    })
    .createTable("attendees_by_class", tbl => {
        tbl.increments();
        tbl.integer("class_id")
            .unsigned()
            .references("classes.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        tbl.integer("user_id")
            .unsigned()
            .references("users.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("attendees_by_class")
    .dropTableIfExists("classes")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
