'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define('Leave', {
    type: DataTypes.STRING,
    leaveQuota: DataTypes.INTEGER
  }, {});
  Leave.associate = function(models) {
    // associations can be defined here
    Leave.belongsToMany(models.Employee, {through: 'EmployeeLeaves'})
  };
  return Leave;
};