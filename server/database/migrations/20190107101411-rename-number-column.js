'use strict';

let migration = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'number', 'phoneNumber');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'phoneNumber', 'number');
  }
};

if (process.env.NODE_ENV === 'test') {
  migration = {
    up: (queryInterface, Sequelize) => {
      return new Promise((resolve) => {
        resolve();
      });
    },

    down: (queryInterface, Sequelize) => {
      return new Promise((resolve) => {
        resolve();
      });
    }
  };
}

module.exports = migration;
