'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Reasons', [{
      reasonName: 'Sick Leave',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      reasonName: 'Maternity Leave',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      reasonName: 'Annual Leave',
      createdAt: new Date,
      updatedAt: new Date
    }, {
      reasonName: 'Sick Leave',
      createdAt: new Date,
      updatedAt: new Date
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Reasons', null, {});
  }
};
