'use strict';
const bcryptHash = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const convertDate = require('../helpers/getMonthAndYear')
  const Employee = sequelize.define('Employee', {
    nik: DataTypes.STRING,
    name: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      defaultValue: '12345'
    },
    role: DataTypes.STRING,
    timeOff: DataTypes.INTEGER,
    DepartmentId: DataTypes.INTEGER,
    email : {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args :true,
          msg : "Validation error : email format is incorrect"
        },
        isUnique: function(value) {
          let self = this
           return Employee.findOne({
              where: {
                email: value
              }
            })
              .then(function(result){
                if (result) {
                  if(result.id != self.id)
                  throw (`email is already used`)
                }})
              .catch((err) => {
                throw (err)
              })
        }
      }
    },
    gender: DataTypes.STRING
  }, {
    hooks : {
      beforeValidate : function(employee) {
        if(!employee.email){
          let elemen = employee.dataValues.name.split(' ')
          let random = Math.floor(Math.random() * (1000 - 100 + 1) + 100)
          employee.email = `${elemen[0]}${random}@mail.com`
        }
      },
      beforeCreate : function(employee){
        return bcryptHash(employee.password)
            .then(hash=>{
              employee.password = hash
            })
            .catch(err=>{
              throw err
            })
      }
    }
  });
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.belongsToMany(models.Leave, {through: models.EmployeeLeave})
    Employee.hasOne(models.Department)
    Employee.hasMany(models.EmployeeLeave)
  };

  Employee.prototype.convertDate = function() {
    return convertDate(this.createdAt)
  }

  return Employee;
};