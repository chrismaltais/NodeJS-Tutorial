const request = require('supertest');

const {app} = require('./../server');
const {Member} = require('./../models/members');

// Clear DB to allow for proper testing
beforeEach((done) => {
    Member.deleteMany({}).then(() => {
        done();
    })
});

afterEach((done) => {
    // close the server somehow?
    done();
})

describe('POST /members', () => {
    it('should create a new member', (done) => {
        // Mock Data
        let testMember = {
            name: 'Chris Maltais',
            email: 'chris.maltais@queensu.ca',
            password: 'pass123'
        };
        //Supertest!!
        request(app)
            .post('/members')
            .send(testMember)
            .expect(200)
            .expect((res) => {
                expect(res.body.name).toBe(testMember.name);
                expect(res.body.email).toBe(testMember.email);
                expect(res.body.password).toBe(testMember.password);
            })
            .end((err, res) => { // handles errors above
                if (err) {
                    return done(err);
                }
                Member.find().then((members) => {
                    expect(members.length).toBe(1);
                    expect(members[0].name).toBe(testMember.name);
                    expect(members[0].email).toBe(testMember.email);
                    expect(members[0].password).toBe(testMember.password);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should not create member with invalid body data', (done) => {
        request(app)
            .post('/members')
            .send()
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Member.find().then((members) => {
                    expect(members.length).toBe(0);
                    done(err);
                }).catch((err) => {
                    done(err);
                })
            })
    })
});