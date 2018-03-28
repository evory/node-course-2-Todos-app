// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodosApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }    
    console.log('Connected to MongoDB server');
    const db = client.db('TodosApp')

//http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    // _id: new ObjectID('5abbe456d955d2d2d870331d')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result)
    // })

    db.collection('Users').findOneAndUpdate({
        _id: 123
    }, {
        $set: {
            name: 'Bryan'
        },
        $inc: {
            age: +1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);    })


    // client.close();
})