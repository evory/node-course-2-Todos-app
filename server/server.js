const express = require('express');
const bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err.errors.text.message);
        
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({todos})
    }, (err) => {
        res.status(404).send(err.errors.text.message)
    })
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send('Todos not found')
        }
        res.send({todo});
    }).catch((err) => {
        res.status(400).send(err)    
    })
})


app.listen(3000, () => {
    console.log('Listen on port 3000');
});

module.exports = {app}