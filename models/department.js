'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING,
    ManagerId: DataTypes.INTEGER
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
    Department.hasMany(models.Employee)
    Department.hasOne(models.Employee, {as: 'Manager'})
  };
  return Department;
};