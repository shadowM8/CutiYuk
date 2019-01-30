'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeLeave = sequelize.define('EmployeeLeave', {
    EmployeeId: DataTypes.INTEGER,
    LeaveId: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    start: DataTypes.DATEONLY,
    duration: DataTypes.INTEGER,
    status: DataTypes.STRING,
    delegation: DataTypes.STRING,
    DepartmentId: DataTypes.INTEGER
  }, {});
  EmployeeLeave.associate = function(models) {
    // associations can be defined here
    // EmployeeLeave.hasMany(models.Leave)
    // EmployeeLeave.hasMany(models.Employee)
  };
  return EmployeeLeave;
};