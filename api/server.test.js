const supertest = require('supertest');

const server = require('./server.js');

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
})