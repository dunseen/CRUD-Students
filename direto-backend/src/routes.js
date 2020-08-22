const express = require('express');
const authConfig = require('./config/auth');
const { verify } = require('jsonwebtoken');

const UserController = require('./controller/UserController');
const StudentController = require('./controller/StudentController');
const SessionController = require('./controller/SessionController');


const routes = express.Router();

function verifyJWT(request, response, next){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Error('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded;

        request.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new Error('Invalid JWT Token', 401);
    }
}



routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete);

routes.post('/sessions', SessionController.store);

routes.get('/students', verifyJWT,StudentController.index);
routes.post('/students' , verifyJWT,StudentController.store);
routes.put('/students/:id', verifyJWT,StudentController.update);
routes.delete('/students/:id', verifyJWT,StudentController.delete);

module.exports = routes;