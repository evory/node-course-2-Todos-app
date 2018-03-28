// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodosApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }    
    console.log('Connected to MongoDB server');
    const db = client.db('TodosApp')

    // db.collection('Todos').find({
    //     _id: new ObjectID('5abb8d99fcea9e28c002a543')
    // }).toArray().then((docs) => {
    //     console.log('Todos')
    //     console.log(JSON.stringify(docs, undefined, 2))

    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // })

    db.collection('Users').find({name: "Bryan"}).toArray().then((list) => {
        console.log(list);
        console.log(JSON.stringify(list, undefined, 2))

    }, (err) => {
        console.log('Unable to fetch data')
    })


    db.collection('Users').find({name: 'Bryan'}).count().then((count) => {
        console.log(`Todos count: ${count}`)
    }, (err) => {
        console.log('Unable to fetch todos', err)
    })

    // client.close();
})