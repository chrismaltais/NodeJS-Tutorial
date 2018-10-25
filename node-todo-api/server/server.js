let express = require('express');
let bodyParser = require('body-parser');
const port = 3000 || process.env.PORT;

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

// GET /member/123

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});