'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING,
    ManagerId: DataTypes.INTEGER
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
    Department.hasMany(models.Employee)
    Department.belongsTo(models.Employee, {as: 'Manager', targetKey: 'ManagerId'})
  };
  return Department;
};