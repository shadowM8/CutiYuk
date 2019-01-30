'use strict';
const bcryptHash = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const convertDate = require('../helpers/getMonthAndYear')
  const Employee = sequelize.define('Employee', {
    nik: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
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
        let elemen = employee.dataValues.name.split(' ')
        let random = Math.floor(Math.random() * (1000 - 100 + 1) + 100)
        employee.dataValues.email = `${elemen[0]}${random}@mail.com`
        return (employee.email)
      },
      beforeCreate : function(employee){
        let elemen = employee.name.split(' ')
        employee.dataValues.password = `pass${elemen[0]}`
        console.log(employee.dataValues.password)
        return bcryptHash(employee.password)
            .then(hash=>{
              employee.password = hash
            })
            .catch(err=>{
              console.log(err)
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