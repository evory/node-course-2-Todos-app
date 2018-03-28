// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodosApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }    
    console.log('Connected to MongoDB server');
    const db = client.db('TodosApp')

    // db.collection('Todos').deleteMany({text: 'lunch'}).then((result) => {
    //     console.log(result)
    // })

    // db.collection('Todos').deleteOne({text: 'lunch'}).then((result) => {
    //     console.log(result);
    // })

    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result)
    })

    // client.close();
})