const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {Member} = require('./../models/members');
const {testMembers, populateMembers} = require('./seed/seed');

// Clear DB to allow for proper testing
beforeEach(populateMembers);

describe('POST /members', () => {
    it('should create a new member', async () => {
        let name = 'Adam Hardy';
        let email = 'adamhardy@hardy.com';
        let password = 'pass1234';
        let response = await request(app)
            .post('/members')
            .send({name, email, password})
            .expect(200)
        
        expect(response.headers['x-auth']).toBeDefined();
        expect(response.body._id).toBeDefined();
        expect(response.body.email).toBe(email);

        let memberFromDB = await Member.findOne({email});

        expect(memberFromDB).toBeDefined();
        expect(memberFromDB.password).not.toBe(password);
    });

    it('should return validation errors if request invalid', async () => {
        let name = 'Adam Hardy';
        let invalidEmail = '123';
        let password = 'pass1234';

        let response = await request(app)
            .post('/members')
            .send({name, invalidEmail, password})
            .expect(400)
    });
    
    it('should not create a user if email is in use', async () => {
        let memberData = {
            name: 'Adam Hardy',
            email: testMembers[0].email,
            password: 'pass1234'
        }

        let response = await request(app)
            .post('/members')
            .send(memberData)
            .expect(400)
    })
});

describe('POST /login', () => {
    it('should login member and return auth token', async () => {
        let response = await request(app)
            .post('/login')
            .send({
                email: testMembers[1].email,
                password: testMembers[1].password
            })
            .expect(200)
        
        // Test that token was properly given
        expect(response.headers['x-auth']).toBeDefined(); 

        // Test that token given to member is the correct in database
        let foundMember = await Member.findById(testMembers[1]._id);
        expect(foundMember.tokens[0]).toMatchObject({ //toMatchObject used result is tested against subsset of objects
            access: 'auth',
            token: response.headers['x-auth']
        });

    });

    it('should reject and invalid login', async () => {
        let response = await request(app)
            .post('/login')
            .send({
                email: testMembers[1].email,
                password: 'IncorrectPassword'
            })
            .expect(401)

            expect(response.headers['x-auth']).toBeUndefined()
        
            let foundMember = await Member.findById(testMembers[1]._id);
            expect(foundMember.tokens.length).toBe(0);

    });
})

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
            })
            .end(done)
    });

    it('should return 404 if member not found', (done) => {
        let fakeID = new ObjectId();
        request(app)
            .get(`/members/${fakeID.toHexString}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/members/123')
            .expect(404)
            .end(done)
    });
});

describe('GET /members/me', () => {
    it('should return member if authenticated', async ()=> {
        let response = await request(app)
            .get('/members/me')
            .set('x-auth', testMembers[0].tokens[0].token) // Headers!
            .expect(200)

        expect(response.body._id).toBe(testMembers[0]._id.toHexString());
        expect(response.body.email).toBe(testMembers[0].email);
    })

    it('should return 401 if not authenticated', async () => {
        let response = await request(app)
            .get('/members/me')
            .expect(401)
        
        expect(response.body).toEqual({});
    });
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