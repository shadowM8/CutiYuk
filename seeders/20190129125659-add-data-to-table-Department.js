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
   return queryInterface.bulkInsert('Departments',[{
     name : 'Human Capital',
     ManagerId : 3,
     createdAt : new Date,
     updatedAt : new Date
   },{
    name : 'Research Development',
    ManagerId : null,
    createdAt : new Date,
    updatedAt : new Date
  },{
    name : 'Sales and Marketing',
    ManagerId : null,
    createdAt : new Date,
    updatedAt : new Date
  }], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Departments', null, {})
  }
};
