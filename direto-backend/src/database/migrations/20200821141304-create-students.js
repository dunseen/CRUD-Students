'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Students', {
       id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
       },
       userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Users', key: 'id'},
        onUpade: 'CASCADE',
        onDelete: 'CASCADE'
       },
       name: {
         type: Sequelize.STRING,
         allowNull: false,
       },
       registration: {
         type: Sequelize.UUID,
         allowNull: false
       },
       email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
      });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Students');
     
  }
};
