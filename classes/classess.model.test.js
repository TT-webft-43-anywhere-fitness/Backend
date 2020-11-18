const Classes = require('./classes-model')
const db = require('../data/dbConfig.js')

const sample = {
    "class_name":"test name",
    "type":"test type",
    "start_time": "08:00",
    "end_time":"09:00",
    "intensity":5,
    "location":"test location",
    "enrolled":5,
    "max_size":9,
    "instructor_id":1
}

beforeEach(async () => {
    await db('classes').truncate()
})

describe('classes model', () => {
    describe('insert(newClass)', () => {
        it('posts a new class and returns the new class', async () => {
            const test = await Classes.insert(sample)
            console.log(test)
            expect(test).toMatchSnapshot()
        });
    });
    describe('getAll()', () => {
        it('retrieves all of the classes', async () => {
            const test = await db("classes").insert(sample)
            const classArr = await Classes.getAll()

            expect(classArr).toHaveLength(1)
        });
    });
    describe('findById(id)', () => {
        it('adds a class and then retireves it', async() => {
            const test = await db("classes").insert(sample)
            const result = await Classes.findById(1)
            console.log("RESULT",result)

            expect(result.intensity).toBe(5)

        });
        
    });

    describe('update(id,changes)', () => {
        it(' selects the correct classs and makes any changes', async () => {
            const test = await db("classes").insert(sample)
            const updated = await Classes.update(1,{
                ...sample,
                intensity:3
            })

            expect(updated.intensity).toBe(3)
        });
        
    });

    describe('remove(id)', () => {
        it('creates and deletes an object returning an empty array', async () => {
            const test = await db("classes").insert(sample)
            await Classes.remove(1)
            const emptyArr = await db('classes')

            expect(emptyArr).toHaveLength(0)
        });
        
    });

    describe('enrollAttendee(user_id,class_id)', () => {
        it('adds a user to a class', async () => {
            const test = await db("classes").insert(sample)
            await Classes.enrollAttendee(1,test.id)
            const attendArr = db("attendees_by_class").where({class_id:test.id})

            expect(attendArr).toHaveLength(1)
        });
        
    });
    

    describe('getAttendeesByClass(class_id)', () => {
        it('retreieves all the attendeess for a class and returns an array of them', async () => {
            const test = await db("classes").insert(sample)
            await db("attendees_by_class").insert({class_id:test.id,user_id:1})
            const attendArr = await Classes.getAttendeesByClass(test.id)

            expect(attendArr).toHaveLength(1)
        });
        
    });

    // describe('removeAttendee(user_id,class_id)', () => {
    //     it('removes an attendee from the table', async() => {
            
    //     });
        
    // });
    
      
    
    
    
});
