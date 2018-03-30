require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser')
const _ = require('lodash');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');

var app = express();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({todos})
    }, (err) => {
        res.status(404).send(err.errors.text.message)
    })
});

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

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']) // user can onlu update what is in the []

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {$set : body}, {new: true}).then ((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        return res.send({todo});
    }).catch((err) => {
        res.status(400).send();
    })
})

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) => {
        res.status(400).send(err)
    })
})


app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
});

module.exports = {app}