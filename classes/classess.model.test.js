const Classes = require('./classes-model')
const db = require('../data/dbConfig.js')

const sample = {
    "class_name":"test name",
    "type":"test type",
    "start_time": "08:00",
    "end_time":"09:00",
    "intensity":5,
    "location":"test location",
    "num_attendies":5,
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
    
    
    
    
});
