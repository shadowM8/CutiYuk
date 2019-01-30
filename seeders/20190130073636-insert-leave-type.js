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
      return queryInterface.bulkInsert('Leaves', [{
        type: 'Maternity Leave',
        leaveQuota: 60,
        createdAt: new Date,
        updatedAt: new Date
      }, {
        type: 'Sick Leave',
        leaveQuota: 10,
        createdAt: new Date,
        updatedAt: new Date
      }, {
        type: 'Annual Leave',
        leaveQuota: 12,
        createdAt: new Date,
        updatedAt: new Date
      }, {
        type: 'Period Leave',
        leaveQuota: 2,
        createdAt: new Date,
        updatedAt: new Date
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Leaves', null, {});
  }
};
