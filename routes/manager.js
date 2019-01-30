const router = require('express').Router()
const Model = require('../models')
const Employee = Model.Employee

router.get('/', (req, res) => {
    Employee.findOne({
        where: {
            role: 'manager'
        }
    }) //nantinya akan mengambil nilai dari session untuk mengakses data manager
        .then(manager => {
            // res.send(manager)
            res.render('pages/manager/managerDashboard', { manager })
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/addEmployee',(req,res)=>{
    Model.Department.findAll()
        .then(department=>{
            let message = req.query.message
            res.render('pages/manager/addEmployeeForm', {department, message})
        })
        .catch(err=>{
            res.send(err)
        })
    
})

router.post('/addEmployee',(req,res)=>{
    let newEmployee = req.body
    Model.Employee.create({
        nik : newEmployee.nik,
        name : newEmployee.name,
        role : newEmployee.role,
        DepartmentId : newEmployee.DepartmentId,
        timeOff : 12
    })
        .then(()=>{
            let msg = `success add new Employee`
            console.log(msg)
            res.redirect(`/manager/addEmployee/?message=${msg}`)
        })
        .catch(err=>{
            res.redirect(`/manager/addEmployee/?message=${err}`)
        })
})

router.get('/leaveRequest',(req,res)=>{
    Model.EmployeeLeave.findAll({
        where : {
            // nanti employeeId dan 
            EmployeeId : 1
        }
    })
})

module.exports = router