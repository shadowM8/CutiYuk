'use strict';
module.exports = (sequelize, DataTypes) => {
  const convertDate = require('../helpers/getMonthAndYear')
  const Employee = sequelize.define('Employee', {
    nik: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    timeOff: DataTypes.INTEGER,
    DepartmentId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.belongsToMany(models.Leave, {through: 'EmployeeLeaves'})
    Employee.hasOne(models.Department)
  };

  Employee.prototype.convertDate = function() {
    return convertDate(this.createdAt)
  }

  return Employee;
};