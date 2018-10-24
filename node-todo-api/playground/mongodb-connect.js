// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID:obj_id} = require('mongodb');
const uri = 'mongodb://localhost:27017/ProfileProjectTest'
let obj = new obj_id();
console.log(obj);

// First argument is where database lives (could be heroku or AWS, etc.)
MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('ProfileProjectTest');

    db.collection('Members').insertOne({
        name: 'Smith MSithens',
        age: 20,
        program: 'Computer Engineering',
        year: 2,
        email: 'smith.smithens@queensu.ca'
    }, (err, result) => {
        if (err) {
            return console.log('Could not insert user. Error:', err);
        }
        //console.log(result.ops[0]._id.getTimestamp());
        console.log(JSON.stringify(result.ops, undefined, 4));
    })

    client.close();
});
