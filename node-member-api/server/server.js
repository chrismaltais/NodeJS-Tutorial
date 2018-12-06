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

app.post('/members', (req, res) => {
    let body = _.pick(req.body, ['email', 'password', 'name']);
    let member = new Member(body);
    
    member.save().then(() => {
        return member.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(member);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

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
        res.status(400).send(); // Send needs to be blank, why?
    });
});

app.delete('/members/:id', (req, res) => {
    let id = req.params.id;
     
    if (!ObjectId.isValid(id)) {
        return res.status(404).send({
            error: 'Invalid Object Id'
        });
    }

    Member.findByIdAndDelete(id).then((member) => {
        if (!member) {
            return res.status(404).send({error: 'Member not found in database!'});
        }
        res.status(200).send({member, deleted: true});
    }).catch((err) => res.status(400).send());
});

app.patch('/members/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['bio', 'photo']);

    if (!ObjectId.isValid(id)) {
        return res.status(404).send({
            error: 'Invalid Object ID'
        });
    }

    body.bio = req.body.bio;
    body.photo = req.body.photo;

    Member.findByIdAndUpdate(id, {$set: body}, {new: true}).then((member) => {
        if (!member) {
            return res.status(404).send({
                error: 'Member not found!'
            })
        }
        res.status(200).send({member});
    }).catch((e) => res.status(400).send());
});

if (process.env.ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

module.exports = {app};