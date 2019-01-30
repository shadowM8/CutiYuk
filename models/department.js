'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING,
    EmployeeId: DataTypes.INTEGER
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
    Department.hasMany(models.Employee)
    Department.belongsTo(models.Employee)
  };
  return Department;
};