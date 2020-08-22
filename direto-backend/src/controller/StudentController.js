const User = require('../models/User');
const Student =  require('../models/Student');

const { uuid } = require('uuidv4');
const { response } = require('express');

module.exports = {
    async index(request, response) {
        const { user_id } =  request.params;

        const user = await User.findByPk(user_id, {
            include: {association: 'students'}
        });

        if(!user){
            return response.status(400).json({error: 'User not found.'});
        }



        return response.json(user);
    },
    async store(request, response) {
        const { user_id } = request.params;
        const { name, email, phone } = request.body;
        
        const user = await User.findByPk(user_id);

        if(!user) {
            return response.status(400).json({error: 'User not found'});
        }

        const emailExists = await Student.findOne({
            where: { email }
        });

        if (emailExists) {
            return response.status(400).json({error: 'Email already exists'});
        }

        try {
            const student = await Student.create({
                name,
                email,
                phone,
                registration: uuid(),
                userId:user_id
            });

            return response.json(student);
            
        } catch (error) {
            throw new Error(error);
        }

    },
    async update(request, response) {
        const { email, name, phone } = request.body;
        const { id } = request.params;

        const exists = await Student.findByPk(id);

        if (!exists){
            return response.status(404).json({error: 'Student not found.'});
        }

        try {
            await Student.update({
                email: email,
                name: name,
                phone: phone
            }, { where: {
                id: id
            }});

            const student = await Student.findByPk(id);
    
            return response.json(student);
            
        } catch (error) {
            return response.status(400).json({error:'Fail on update user.'})
        }


    },
    async delete(request, response) {
        const { id } = request.params;

        const exists = Student.findByPk(id);

        if(!exists) {
            return response.status(404).send().json({error: 'Student not found.'})
        }

        try {
            await Student.destroy({
                where:{
                    id: id
                }
            });
    
            return response.send().status(200);
            
        } catch (error) {
            throw new Error(error);
        }
    },
}