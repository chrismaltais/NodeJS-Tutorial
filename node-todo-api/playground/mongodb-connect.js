const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');
    
    db.collection('ToDos').insertOne({
        item: 'Task 1',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert Todo!', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    
    db.collection('Users').insertOne({
        name: 'Chris Maltais',
        age: 21,
        location: 'Toronto, ON'
    }, (err, result) => {
        if (err) {
            return console.log('Could not insert user. Error:', err);
        }
        
        console.log(JSON.stringify(result.ops, undefined, 2));
    })
    
    client.close();
});

