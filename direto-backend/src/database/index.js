const Sequelize = require('sequelize');

const dbConfig = require('../config/database');
const User = require('../models/User');
const Student = require('../models/Student');

const connection = new Sequelize(dbConfig);

User.init(connection);
Student.init(connection);

module.exports = connection;