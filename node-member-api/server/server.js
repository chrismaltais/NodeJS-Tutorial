let express = require('express');
let bodyParser = require('body-parser');
let {ObjectId} = require('mongodb');
const port = process.env.PORT || 3000;

// Use object destructuring otherwise would need to do Member.Member
let {mongoose} = require('./db/mongoose');
let {Member} = require('./models/members');
let {Project} = require('./models/projects');

let app = express();

//Return value of bodyParser.json() is a function, which is a middleware we need to give to express
app.use(bodyParser.json());

app.post('/members', (req, res) => {
    let member = new Member({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    member.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
});

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
        res.status(200).send(member);
    }).catch((err) => res.status(400).send());
});

if (process.env.ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

module.exports = {app};