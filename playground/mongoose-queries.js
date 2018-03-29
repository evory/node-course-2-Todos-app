const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


var id = '5abc6a66d955d2d2d8705bbf';

// if (!ObjectID.isValid(id)) {
//     console.log('Id not valid')
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(todos)
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log(todo)
// })

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('id not found')
//     }
//     console.log('Todo by id', todo)
// }).catch((err) => console.log(err))

User.findById(id).then((user) => {
    if (!user) {
        return console.log('user not found');
    }
    console.log(user);
}).catch((err) => {
    return console.log(err)
})