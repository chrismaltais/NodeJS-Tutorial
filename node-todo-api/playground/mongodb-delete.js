const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017/ProfileProjectTest';

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Error! Could not connect to DB.');
    }
    console.log('Connected to Database.');
    const db = client.db('ProfileProjectTest');

    // db.collection('Members').deleteMany({email: 'smith.smithens@queensu.ca'}).then((result) => {
    //     console.log(result);
    //     let {result: {ok: deleted}} = result;
    //     let {result: {n: numberOfRecords}} = result;
    //     console.log(deleted);
    //     console.log(numberOfRecords);
    // });

    db.collection('Members').findOneAndDelete({name: 'Smith Smithens'}).then((result) => {
        let {lastErrorObject: {n: numRecordsFound}} = result;
        if (numRecordsFound > 0) {
            console.log('Item Found!');
            let {value: itemDeleted} = result;
            console.log('Item is:')
            console.log(JSON.stringify(itemDeleted, undefined, 2));
        } else {
            console.log('Item could not be found! No record deleted.')
        }
    });

    client.close();
});