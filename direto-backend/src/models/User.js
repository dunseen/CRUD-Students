const { Model, DataTypes } = require('sequelize');

const PROTECTED_ATTRIBUTES = ['password', 'token'];

class User extends Model {
    toJSON () {
        
        let attributes = Object.assign({}, this.get())
        for (let a of PROTECTED_ATTRIBUTES) {
          delete attributes[a]
        }
        return attributes
      }
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        }, {
            sequelize: connection
        });
    }
}

module.exports = User;