const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// })

// Todo.findOneAndRemove({}).then((result) => {

// })

Todo.findByIdAndRemove('5abd6562e0b727c1b28ae4c4').then((todo) => {
    console.log(todo);
})