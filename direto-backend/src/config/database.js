module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'crudDatabase',
    define: {
        timestamps: true,
        uderscored: true,
    },
};