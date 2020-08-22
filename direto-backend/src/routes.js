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



routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.get('/users/:user_id/students', verifyJWT,StudentController.index);
routes.post('/users/:user_id/students/' , verifyJWT,StudentController.store);
routes.put('/users/:user_id/students/:id', verifyJWT,StudentController.update);
routes.delete('/users/:user_id/students/:id', verifyJWT,StudentController.delete);

module.exports = routes;