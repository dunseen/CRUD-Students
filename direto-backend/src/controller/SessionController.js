const User = require('../models/User');

const { sign } = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const authConfig = require('../config/auth');

module.exports = {
    async store(request, response){
        const { email, password } = request.body;

        const user = await User.findOne({
            where: { email }
        });
        const { id } = user;

        
        if(!user){
            return response.status(401).json({error: 'Incorret email/password combination'});
        }
        
        const passwordMatched = await compare(password, user.password);
        
        if(!passwordMatched) {
            return response.status(401).json({error: 'Incorret email/password combination'});
        }

        try {
            const token = sign({ id },authConfig.jwt.secret);
    

            return response.json({user: user, token: token});    
        } catch (error) {
            throw new Error(error);
        }
    }
}