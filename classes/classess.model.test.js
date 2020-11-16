const Classes = require('./classes-model')
const db = require('../data/dbConfig.js')

const sample = {
    name:'test name',
    type:'test type',
    startTime: '08:00',
    endTime:'09:00',
    intensity:5,
    location:'test location',
    enrolled:5,
    maxSize:9
}

beforeEach(async () => {
    await db('classes').truncate()
})

describe('classes model', () => {
    describe('insert(newClass)', () => {
        
    });
    
});
