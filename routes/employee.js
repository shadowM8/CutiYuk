const router = require('express').Router()
const Model = require('../models')
const dotenv = require('dotenv').config()
const bcrypt = require('bcryptjs')
const Middleware = require('../helpers/middleware')
const Nexmo = require('nexmo')
const Employee = Model.Employee

router.get('/', (req, res) => {
    res.send('dashboard employee')
})

router.get('/profile', Middleware, (req, res) => {
    Employee.findByPk(req.session.userLogin.id)
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

router.get('/profile/edit', Middleware, (req, res) => {
    Employee.findByPk(req.session.userLogin.id)
    .then(employee => {
        res.render('pages/employees/editProfile', {
            employee: employee
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/profile/edit', Middleware, (req, res) => {
    Employee.update(req.body, {
        where: {
            id: req.session.userLogin.id
        }
    })
    .then(update => {
        res.redirect('/employee/profile')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/requestLeave', Middleware, (req, res) => {
    let dep;
    let employeesName;
    Model.Department.findByPk(req.session.userLogin.DepartmentId)
    .then(department => {
        dep = department
        return department.getEmployees()
    })
    .then(employees => {
        let names = []
        employees.forEach(e => {
            if (e.id !== req.session.userLogin.id) {
                names.push({
                    id: e.id,
                    name: e.name
                })
            }
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

router.post('/requestLeave', Middleware, (req, res) => {
    //masukkin departmentID ketika submit
    Model.EmployeeLeave.create({
        EmployeeId: req.session.userLogin.id,
        LeaveId: req.body.type,
        reason: req.body.reason,
        start: new Date(req.body.date),
        duration: req.body.duration,
        delegation: req.body.delegate,
        DepartmentId: req.session.userLogin.DepartmentId
    })
    .then(data => {
        // const nexmo = new Nexmo({
        //     apiKey: process.env.APIKEY,
        //     apiSecret: process.env.APISECRET
        // })

        // const from = 'Nexmo'
        // const to = '6285714756454'
        // const text = `You got a sick leave request for ${data.duration} days from ${req.session.name}. Please login to your account to respond. Thank you. --CutiYuk`

        // nexmo.message.sendSms(from, to, text)
        res.redirect('/employee/profile')
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router