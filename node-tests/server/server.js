const express = require('express');

let app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(404).send({
        error: 'Page not Found',
        name: 'ToDo App v1.0'
    });
});

app.get('/users', (req, res) => {
   res.send([{
       name: 'Chris Maltais',
       location: 'Toronto, ON'
   }, {
       name: 'Joe Shmoe',
       location: 'Edmonton, Alberta'
   }, {
       name: 'Kylie Jenner',
       location: 'New York City, NY'
   }]); 
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports.app = app;