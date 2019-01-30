'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    nik: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    timeOff: DataTypes.INTEGER,
    DepartmentId: DataTypes.INTEGER
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.belongsToMany(models.Leave, {through: 'EmployeeLeaves'})
    Employee.hasOne(models.Department)
  };
  return Employee;
};