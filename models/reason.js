'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reason = sequelize.define('Reason', {
    reasonName: DataTypes.STRING
  }, {});
  Reason.associate = function(models) {
    // associations can be defined here
    Reason.belongsToMany(models.Employee, {through: 'EmployeeReason'})
  };
  return Reason;
};