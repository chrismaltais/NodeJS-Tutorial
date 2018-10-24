// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb://localhost:27017/ProfileProjectTest';
// First argument is where database lives (could be heroku or AWS, etc.)
MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('ProfileProjectTest');

    db.collection('Members').find({
        _id: new ObjectID('5bcfd9e053cfe1376ef47545')
    }).toArray().then((docs) => {
        console.log('Chris\' Information:');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch members', err);
    });

    db.collection('Members').find({program: 'Computer Engineering'}).toArray().then((docs) => {
        console.groupCollapsed('Members:');
        console.log(JSON.stringify(docs, undefined, 2));
        console.groupEnd();
    }, (err) => {
        console.log('Unable to fetch members', err);
    });

    db.collection('Members').find().count().then((count) => {
        console.log(`Number of Members: ${count}`);
    }, (err) => {
        console.log('Unable to fetch member count', err);
    });

    db.collection('Members').find({program: 'Computer Science'}).count().then((count) => {
        console.log(`Number of members who are in Computer Science: ${count}`);
    }, (err) => {
        console.log('Could not find number of computer science members');
    });

    client.close();
});
