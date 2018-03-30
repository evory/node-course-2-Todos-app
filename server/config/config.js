var env = process.env.NODE_ENV || 'developpement';

if (env === 'developpement') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodosApp'
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodosAppTest'
}

