const request = require('supertest');

const {app} = require('./../server');
const {Member} = require('./../models/members');

let testMembers = [{
    name: 'Jeff Jeffy',
    email: 'jeff.jeffy@queensu.ca',
    password: 'pass123'
}, {
    name: 'Joe Budden',
    email: 'joe.budden@queensu.ca',
    password: 'pass123'
}];

// Clear DB to allow for proper testing
beforeEach((done) => {
    Member.deleteMany({}).then(() => {
        return Member.insertMany(testMembers)
    }).then(() => done())
});

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
                Member.find({email: testMember.email}).then((members) => {
                    expect(members.length).toBe(1); // 3 bc 2 initally then added 1
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
                    expect(members.length).toBe(2);
                    done(err);
                }).catch((err) => {
                    done(err);
                });
            });
    });
});

describe('GET /members', () => {
    it('should get all members', (done) => {
        request(app)
            .get('/members')
            .expect(200)
            .expect((res) => {
                expect(res.body.members.length).toBe(2);
            })
            .end(done)
    });
})