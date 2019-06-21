const supertest = require('supertest');

const server = require('./server.js');

const db = require('../data/dbConfig')

beforeEach(async () => {
    await db('characters').truncate()
  })

describe('server', () => {

    describe('GET /', () => {

        it('responds with correct status of 200', () => {
            return supertest(server)
                .get('/')
                .expect(200)
        })

        it('responds with correct res.body { message: "Server running and ready for requests" }', () => {
            return supertest(server)
                .get('/')
                .then(res => {
                    expect(res.body).toEqual({
                        message: "Server running and ready for requests"
                    })
                })
        })
    })

    describe('GET /characters', () => {
        
        it('responds with status of 200', () => {
            return supertest(server)
            .get('/characters')
            .expect(200)
        })

        it('responds with correct res.body of all characters', () => {
            return supertest(server)
                .get('/characters')
                .then(res => {
                    expect(res.body).toHaveLength(0)
                })
        })
    })

    describe('POST /', () => {

        it('should return the correct response status of 201', async () => {
            const newChar = {
                id: 1, image: null, name: 'Goku'
            }
            await supertest(server)
            .post('/')
            .send(newChar)
            .set('Accept', 'application/json')
            .expect(201)
        })

        it('should post a user to the db though the endpoint', async () => {
            const newChar = {
                image: null, name: 'Goku'
            }
            await supertest(server)
                .post('/')
                .send(newChar)
                .set('Accept', 'application/json')
                .then(res =>  {
                    expect(res.body).toEqual({
                        id: 1, image: null, name: 'Goku'
                    })
                })
        })
    })

    describe('PUT /:id', () => {
        it('should return the correct status', async () => {
            const newChar = {
                name: 'Goku'
            }
            await supertest(server)
            .post('/')
            .send(newChar)
            .set('Accept', 'application/json')
            .expect(201)

            const updatedChar = {
                image: 'https://img00.deviantart.net/ef09/i/2018/057/3/7/goku_mastered_ssj_blue_migatte_palette_by_al3x796-dc4cqmh.png', name: 'goku'
            }
            await supertest(server)
            .put('/1')
            .send(updatedChar)
            .set('Accept', 'application/json')
            .expect(201)
        })

        it('should update the character with the given id in the db through the endpoint', async () => {
            const newChar = {
                name: 'Goku'
            }
            await supertest(server)
            .post('/')
            .send(newChar)
            .set('Accept', 'application/json')
            .expect(201)

            const updatedChar = {
                image: 'https://img00.deviantart.net/ef09/i/2018/057/3/7/goku_mastered_ssj_blue_migatte_palette_by_al3x796-dc4cqmh.png', name: 'goku'
            }
            await supertest(server)
                .put('/1')
                .send(updatedChar)
                .set('Accept', 'application/json')
                .then(res =>  {
                    expect(res.body).toEqual({
                        id: 1, image: 'https://img00.deviantart.net/ef09/i/2018/057/3/7/goku_mastered_ssj_blue_migatte_palette_by_al3x796-dc4cqmh.png', name: 'goku'
                    })
                })
        })
    })

    describe('DELETE /:id', () => {
        it('should return the correct status', async () => {
            const newChar = {
                name: 'Goku'
            }
            await supertest(server)
            .post('/')
            .send(newChar)
            .set('Accept', 'application/json')
            .expect(201)

            await supertest(server)
            .delete('/1')
            .expect(200)
        })

        it('should return 1 if deleted', async () => {
            const newChar = {
                name: 'Goku'
            }
            await supertest(server)
            .post('/')
            .send(newChar)
            .set('Accept', 'application/json')
            .expect(201)

            await supertest(server)
                .delete('/1')
                .then(res =>  {
                    expect(res.body).toBe(1)
                })
        })
    })
    
})