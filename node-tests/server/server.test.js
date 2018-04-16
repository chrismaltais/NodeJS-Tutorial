const request = require('supertest');
const expect = require('chai').expect;
const app = require('./server').app;

describe('Server:', () => {
    describe('GET /', () => {
        it('should return Test Server response', (done) => {
            request(app)
                .get('/')
                .expect(404)
                .expect((res) => {
                    expect(res.body).to.include({
                        error: 'Page not Found'
                    })
                })
                .end(done);
        });
    });
    
    describe('GET /users', () => {
        it('should return users', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .expect((res) => {
                    expect(res.body).to.deep.include({
                        name: 'Chris Maltais',
                        location: 'Toronto, ON'
                    });
                })
                .end(done);
        });
    });
});




