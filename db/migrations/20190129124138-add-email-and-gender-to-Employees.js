'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    let addColumns = [queryInterface.addColumn('Employees', 'email', Sequelize.STRING), queryInterface.addColumn('Employees', 'gender', Sequelize.STRING)]
    return Promise.all(addColumns)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    let undo = [queryInterface.removeColumn('Employees', null, {}), queryInterface.removeColumn('Employees', null, {})]
    return Promise.all(undo)
  }
};
