const router = require('express').Router()
const Model = require('../models')
const Employee = Model.Employee
let reqSession = 3
let depId = 1

router.get('/', (req, res) => {
    res.send('dashboard employee')
})

router.get('/profile', (req, res) => {
    Employee.findByPk(reqSession)
    .then(employee => {
        let dateConverted = employee.convertDate(employee.createdAt)
        res.render('pages/employees/profile', {
            employee: employee,
            convertDate: dateConverted
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/profile/edit', (req, res) => {
    Employee.findByPk(reqSession)
    .then(employee => {
        res.render('pages/employees/editProfile', {
            employee: employee
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/profile/edit', (req, res) => {
    Employee.update(req.body, {
        where: {
            id: reqSession
        }
    })
    .then(update => {
        res.redirect('/employee/profile')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/requestLeave', (req, res) => {
    let dep;
    let employeesName;
    Model.Department.findByPk(depId)
    .then(department => {
        dep = department
        return department.getEmployees()
    })
    .then(employees => {
        // dep.dataValues.Employees = employees
        let names = []
        employees.forEach(e => {
            names.push(e.name)
        })
        employeesName = names
        return Model.Leave.findAll()
    })
    .then(leaveReasons => {
        res.render('pages/employees/requestLeave', {
            types: leaveReasons,
            department: dep,
            names: employeesName
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/requestLeave', (req, res) => {
    //masukkin departmentID ketika submit
    console.log(req.body)
})

module.exports = router