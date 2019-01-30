'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeLeave = sequelize.define('EmployeeLeave', {
    id : {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
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
    EmployeeLeave.belongsTo(models.Employee)
    EmployeeLeave.belongsTo(models.Leave)
  };
  return EmployeeLeave;
};