const Student =  require('../models/Student');

const { uuid } = require('uuidv4');

module.exports = {
    async index(request, response) {
        const students = await Student.findAll();

        return response.json(students);
    },
    async store(request, response) {
        const { name, email, phone } = request.body;

        const exists = await Student.findOne({
            where: {
                email: email,
            }
        });

        if (exists) {
            return response.status(400).json({error: 'Email already exists'});
        }

        try {
            const student = await Student.create({
                name: name,
                email: email,
                phone: phone,
                registration: uuid(),
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