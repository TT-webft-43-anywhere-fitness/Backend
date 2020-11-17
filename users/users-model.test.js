const User = require('./users-model')
const db = require('../data/dbConfig.js');
const { default: expectCt } = require('helmet/dist/middlewares/expect-ct');

beforeEach(async () => {
    await db('users').truncate()
})

const doug = {username:"Doug", password:"guest", role:1}
const archer = {username:"Archer", password:"guest"}

describe('users model', () => {
    describe('getAll()', () => {
        it('returns an empty array', async () => {
            const users = await User.getAll()
            // console.log("THIS IS THE RESULT OF USERS ===>",users)
            expect(users).toHaveLength(0)
        });
        it('gets all the users', async () => {
            await db('users').insert(doug)

            let users = await User.getAll()

            expect(users).toHaveLength(1)
        });
        
    });

    describe('add(user)', () => {
        it('can add a user', async () => {
            await User.add(doug)
            let users = await db('users')
            expect(users).toHaveLength(1)
        });
        
    });

    describe('findById', () => {
        it('can find a user by Id', async() => {
            await db('users').insert(doug)

            const dougTest = await User.findById(1)
            expect(dougTest).toMatchSnapshot()
        });
        
    });

    describe('findClassesByInstructor(instrutorId)', () => {
        it('finds classes that an instructor has. ', () => {
            
        });
        
    });
    
    
    
    
});

