const router = require('express').Router()
const Model = require('../models')
const dotenv = require('dotenv').config()
const bcrypt = require('bcryptjs')
const Middleware = require('../helpers/middleware')
const Nexmo = require('nexmo')
const Employee = Model.Employee

router.get('/',Middleware, (req, res) => {
    Employee.getLastName(req.session.userLogin.id)
    .then(lastName=>{
        res.render('pages/employees/dashBoard',{role : req.session.userLogin.role, isLogin: req.session.userLogin, lastName})
    })
    .catch(err=>{
        res.send(err)
    })
    
})

router.get('/profile', Middleware, (req, res) => {
    Employee.findByPk(req.session.userLogin.id)
    .then(employee => {
        let dateConverted = employee.convertDate(employee.createdAt)
        res.render('pages/employees/profile', {
            employee: employee,
            convertDate: dateConverted,
            role : req.session.userLogin.role,
            isLogin: req.session.userLogin
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
            employee: employee,
            role : req.session.userLogin.role,
            isLogin: req.session.userLogin,
            err: req.query.err
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/profile/edit', Middleware, (req, res) => {
    Employee.update(req.body, {
        where: {
            id: req.session.userLogin.id,
            role : req.session.userLogin.role,
            isLogin: req.session.userLogin
        }
    })
    .then(() => {
        res.redirect('/employee/profile')
    })
    .catch(err => {
        res.redirect(`/employee/profile/edit?err=${err.errors[0].message}`)
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
            names: employeesName,
            role : req.session.userLogin.role,
            isLogin: req.session.userLogin,
            err: req.query.err
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/requestLeave', Middleware, (req, res) => {
    let requestData;
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
        requestData = data
        return Model.Leave.findByPk(data.LeaveId)
    })
    .then(leaveType => {
        const nexmo = new Nexmo({
            apiKey: process.env.APIKEY,
            apiSecret: process.env.APISECRET
        })

        const from = 'Nexmo'
        const to = '6285714756454'
        const text = `You got a ${leaveType.type} request for ${requestData.duration} days from ${req.session.userLogin.name}. Please login to your account to respond. Thank you. --CutiYuk`

        nexmo.message.sendSms(from, to, text)
        res.redirect('/employee/profile')
    })
    .catch(err => {
        res.redirect(`/employee/requestLeave?err=${err}`)
    })
})

module.exports = router