const { Model, DataTypes } = require('sequelize');

class Student extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            registration: DataTypes.UUID,
            phone: DataTypes.STRING,
        }, {
            sequelize: connection
        });
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    }
}

module.exports = Student;