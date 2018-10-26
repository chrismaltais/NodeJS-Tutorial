const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017/ProfileProjectTest';

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Could not connect to Database!');
    }
    const db = client.db('ProfileProjectTest');

    db.collection('Members').findOneAndUpdate({
        email: 'smith.smithens@queensu.ca'
    }, {
        $set: {
            program: 'Computer Engineering',
        },
        $inc: {
            year: 1
        }
    }).then((result) => {
        let {lastErrorObject: {updatedExisting}} = result;
        if (updatedExisting) {
            let {value: {program: oldProgram}} = result;
            let {value: {year: oldYear}} = result;
            console.log(`Changed program from ${oldProgram} to Computer Engineering.`);
            console.log(`Changed year from ${oldYear} to ${oldYear + 1}`);
        }
    });
    client.close();
});