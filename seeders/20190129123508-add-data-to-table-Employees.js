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
    return queryInterface.bulkInsert('Employees', [{
      nik: '1306413126',
      name: 'Budi Mifasol',
      password: 'budi12345',
      role: 'staff',
      timeOff: 12,
      DepartmentId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'budi.remi@yahu.com',
      gender: 'male'
    }, {
      nik: '1306413130',
      name: 'Suprapti Setiawati',
      password: 'soeprapti',
      role: 'staff',
      timeOff: 5,
      DepartmentId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'suprapti_awati@yahu.com',
      gender: 'female'
    }, {
      nik: '1306413150',
      name: 'Aditya Hario Respati',
      password: 'aditya123',
      role: 'manager',
      timeOff: 12,
      DepartmentId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'aditya_H@yahu.com',
      gender: 'male'
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Employees', null, {})
  }
};
