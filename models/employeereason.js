'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeReason = sequelize.define('EmployeeReason', {
    EmployeeId: DataTypes.INTEGER,
    ReasonId: DataTypes.INTEGER,
    approval: DataTypes.STRING
  }, {});
  EmployeeReason.associate = function(models) {
    // associations can be defined here
    EmployeeReason.hasMany(models.Reason)
    EmployeeReason.hasMany(models.Employee)
  };
  return EmployeeReason;
};