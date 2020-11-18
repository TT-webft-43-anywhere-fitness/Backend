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
    
        tbl.integer("role",128)
            .unsigned()
            .references("roles.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    })
    .createTable("classes", tbl => {
        tbl.increments();
        tbl.string("class_name",128)
            .notNullable()
            .unique()
            .index();
        tbl.string("type",128).notNullable();
        tbl.time('start_time',128).notNullable();
        tbl.time("end_time",128).notNullable();
        tbl.integer("intensity",128).unsigned().notNullable();
        tbl.string("location",128).notNullable();
        tbl.integer("enrolled",128).unsigned().notNullable();
        tbl.integer("max_size",128).unsigned().notNullable();
        tbl.integer("instructor_id",128)
            .notNullable()
            .unsigned()
            .references("id")
            .inTable('users')
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    })
    .createTable("attendees_by_class", tbl => {
        tbl.increments();
        tbl.integer("class_id",128)
            .unsigned()
            .references("id")
            .inTable("classes")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
        tbl.integer("user_id",128)
            .unsigned()
            .references("id")
            .inTable("users")
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
