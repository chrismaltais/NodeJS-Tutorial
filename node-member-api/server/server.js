// Sets up environments
require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const port = process.env.PORT || 3000;
const authenticate = require('./middleware/authenticate');
const wrap = require('./middleware/asyncWrapper');

// Use object destructuring otherwise would need to do Member.Member
let {mongoose} = require('./db/mongoose');
let {Member} = require('./models/members');
let {Project} = require('./models/projects');

let app = express();

//Return value of bodyParser.json() is a function, which is a middleware we need to give to express
app.use(bodyParser.json());

app.post('/members', wrap(async (req, res) => {
    let body = _.pick(req.body, ['email', 'password', 'name']);
    let member;
    try {
        member = new Member(body);
        await member.save();
        let token = await member.generateAuthToken();
        res.header('x-auth', token).send(member);
    } catch (err) {
        res.status(400).send({error: 'Email already exists!'})
    }
}));

app.post('/login', wrap(async (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let foundMember = await Member.findByCredentials(body.email, body.password);
    if (!foundMember) {
        return res.status(401).send();
    }
    let token = await foundMember.generateAuthToken();
    res.header('x-auth', token).status(200).send(foundMember);
}));

app.delete('/logout', authenticate, wrap(async (req, res) => {
    try {
        await req.member.deleteToken(req.token);
    } catch (err) {
        return res.status(400).send(err);
    }

    res.status(200).send();
}))

app.get('/members', (req, res) => {
    Member.find().then((members) => {
        res.send({
            members, // This is what your object will be called!
            message: 'This is a test!'
        })
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/members/me', authenticate, (req, res) => {
    res.send(req.member);
})

app.get('/members/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(404).send({
            error: 'ObjectId is not valid'
        });
    }

    Member.findById(id).then((member) => {
        if (!member) {
            return res.status(404).send({error: 'Member not found'});
        }
        res.status(200).send({member}); // Object name returned is 'member'
    }).catch((err) => {
        res.status(400).send(); 
    });
});

// Thinking about making this /members/me so only members can delete their own accounts
app.delete('/members/:id', async (req, res) => {
    let id = req.params.id;
     
    if (!ObjectId.isValid(id)) {
        return res.status(404).send({
            error: 'Invalid Object Id'
        });
    }

    try {
        let deletedMember = await Member.findByIdAndDelete(id);
        if(!deletedMember) {
            return res.status(404).send({error: 'Could not find member in the database!'});
        }
        console.log(deletedMember)
        res.status(200).send({deleted: true});
    } catch (e) {
        res.status(400).send({error: 'Could not reach database at this time!'});
    }
});


app.patch('/members/me', authenticate, wrap(async (req, res) => {
    // Grab ID (req.member._id?)
    let id = req.member._id;
    let body = _.pick(req.body, ['name', 'bio', 'photo']);
    let updatedMember;
    try {
        updatedMember = await Member.findByIdAndUpdate(id, {$set: body}, {new: true});
        if (!updatedMember) {
            return res.status(404).send({error: 'Member not found!'});
        }
    } catch (err) {
        return res.status(400).send();
    }
    res.status(200).send(updatedMember);

}))

if (process.env.ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

module.exports = {app};