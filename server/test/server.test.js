const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server')
const {Todo} = require('./../models/todo')

const todos = [{
    _id: '5abc2261edf451484bf15bc4',   
    text: "first test"
}, {
    _id: '5abc2261edf451484bf15bc5',
    text: "second test"
}];

const InvalidIdTodo = [{
    _id: '6abc2261edf451484bf15bc4',   
    text: "first test"
}, {
    _id: '5abc3261edf451484bf15bc5',
    text: "second test"
}];

beforeEach((done) => {
    Todo.remove().then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
})

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'test todo text'

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((doc) => {
                    expect(doc.length).toBe(1)
                    expect(doc[0].text).toBe(text);
                    done();
                }).catch((err) => console.log(err))
            })
    });
    it('Should not create a new todo', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2)
                    done();
                }).catch((err) => done(err))
            })
    })
})

describe("GET /todos", () => {
    it('Should return the list of todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2)
        })
        
        .end(done)
    })
})

describe("GET /todos/:id", () => {
    it('Should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done)
    })

    it('should return a 404 if todo not fount', (done) => {
        request(app)
        .get(`todos/${InvalidIdTodo[0]._id}`)
        .expect(404)
        .end(done)
    })

    it('should return 404', (done) => {
        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done)
    })
})