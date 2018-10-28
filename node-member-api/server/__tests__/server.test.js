const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {Member} = require('./../models/members');

let testMembers = [{
    _id: new ObjectId(),
    name: 'Jeff Jeffy',
    email: 'jeff.jeffy@queensu.ca',
    password: 'pass123',
    bio: null
}, {
    _id: new ObjectId(),
    name: 'Joe Budden',
    email: 'joe.budden@queensu.ca',
    password: 'pass123',
    bio: null
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
            .expect((res) => { // Custom expect call
                expect(res.body.members.length).toBe(2);
            })
            .end(done)
    });
});

describe('GET /members/:id', () => {
    it('should return member document', (done) => {
        request(app)
            .get(`/members/${testMembers[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.member.name).toBe(testMembers[0].name);
                expect(res.body.member.email).toBe(testMembers[0].email);
                expect(res.body.member.password).toBe(testMembers[0].password)
            })
            .end(done)
    });

    it('should return 404 if member not found', (done) => {
        // Make sure you get 404 back
        let fakeID = new ObjectId();
        request(app)
            .get(`/members/${fakeID.toHexString}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        // /todos/123
        request(app)
            .get('/members/123')
            .expect(404)
            .end(done)
    })
});

describe('DELETE /members/:id', () => {
    it('should delete member document', (done) => {
        let id = testMembers[0]._id.toHexString()
        request(app)
            .delete(`/members/${id}`)
            .expect(200)
            .expect((result) => {
                expect(result.body.member.name).toBe(testMembers[0].name);
                expect(result.body.member.email).toBe(testMembers[0].email);
                expect(result.body.member.password).toBe(testMembers[0].password);
            }).end((err, res) => {
                if (err) {
                    return done(err);
                }
                Member.findById(id).then((member) => {
                    expect(member).toBeNull();
                    done();
                }).catch((e) => done(e));
            })
    });

    it('should return 404 if member not found', (done) => {
        let fakeID = new ObjectId();
        request(app)
            .delete(`/members/${fakeID.toHexString()}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .delete('/members/123')
            .expect(404)
            .end(done)
    });
});

describe('PATCH /members/:id', () => {
    it('should update a member', (done) => {
        let updatedInfo = {
            bio: 'I love coding!'
        };
        let id = testMembers[0]._id.toHexString();
        request(app)
            .patch(`/members/${id}`)
            .send(updatedInfo)
            .expect(200)
            .expect((res) => { // Confirm what you're getting back, does not necessarily mean written to DB!
                expect(res.body.member._id).toBe(id);
                expect(res.body.member.bio).toBe(updatedInfo.bio);
            }).end((err, res) => {
                if (err) {
                    return done(err);
                }
                Member.findById(id).then((member) => {
                    expect(member.bio).toBe(updatedInfo.bio)
                    done();
                }).catch((e) => done(e))
            });
    });

    it('should return 404 if member not found', (done) => {
        let fakeID = new ObjectId();
        request(app)
            .patch(`/members/${fakeID.toHexString()}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 for non object ids', (done) => {
        request(app)
            .patch('/members/123')
            .expect(404)
            .end(done)
    });
});