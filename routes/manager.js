const router = require('express').Router()
const Model = require('../models')
const Employee = Model.Employee
const Nexmo = require('nexmo');
const dotenv = require('dotenv').config()
const checkManager = require('../helpers/checkManager')

router.get('/', checkManager, (req, res) => {
    Employee.findOne({
        where: {
            // id: req.session.userLogin.id,
            id : req.session.userLogin.id,
            role: req.session.userLogin.role
        }
    })
    .then(manager => {
        res.render('pages/manager/managerDashboard', { 
            manager, role: req.session.userLogin.role, 
            isLogin: req.session.userLogin
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/addEmployee', checkManager, (req, res) => {
    Model.Department.findAll()
        .then(department => {
            let message = req.query.message
            res.render('pages/manager/addEmployeeForm', { 
                department, message, 
                role: req.session.userLogin.role, 
                isLogin: req.session.userLogin 
            })
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/addEmployee', checkManager, (req, res) => {
    let newEmployee = req.body
    Model.Employee.create({
        nik: newEmployee.nik,
        name: newEmployee.name,
        role: newEmployee.role,
        DepartmentId: newEmployee.DepartmentId,
        timeOff: 12,
        gender: newEmployee.gender
    })
        .then((newEmployee) => {
            const nexmo = new Nexmo({
                apiKey: process.env.APIKEYfromManager,
                apiSecret: process.env.APISECRETfromManager
            })
    
            const from = 'Nexmo'
            const to = '628156615006'
            const text = `Your Account at CutiYuk App has been created, your email is ${newEmployee.email} and password is 12345. Please update your password for better security - CutiYuk`
    
            nexmo.message.sendSms(from, to, text)
            let msg = `success add new Employee`
            res.redirect(`/manager/addEmployee/?message=${msg}`)
        })
        .catch(err => {
            res.redirect(`/manager/addEmployee/?message=${err}`)
        })
})

router.get('/leaveRequest', checkManager, (req, res) => {
    Model.EmployeeLeave.findAll({
        include: [Model.Employee, Model.Leave],
        where: {
            DepartmentId: req.session.userLogin.DepartmentId
            // DepartmentId: 1
        }
    })
        .then(leaveRequestData => {
            res.render('pages/manager/leaveRequestPage', { leaveRequestData , role: req.session.userLogin.role, isLogin: req.session.userLogin })
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/leaveRequest/:conjunctionId', checkManager, (req, res) => {
    let leaveData = null
    let employeeData = null
    Model.EmployeeLeave.findByPk(req.params.conjunctionId)
    .then(leaveReasonData => {
        leaveData = leaveReasonData
        return leaveReasonData.getEmployee() 
    })
    .then(employee=>{
        employeeData = employee
        return employee.getEmployeeLeaves({
            where : {
                status : "Approved"
            }
        })       
    })
    .then(allEmployeeleave=>{
        let xData = []
        let yData = []
        allEmployeeleave.forEach(leave=>{
            xData.push(leave.reason)
            yData.push(leave.duration)
        })
        let err = req.query.err
        res.render('pages/manager/leaveRequestForm', {
            leaveData, 
            employeeData, 
            x : xData, 
            y : yData,
            err : err,
            role : req.session.userLogin.role,
            isLogin : req.session.userLogin
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/leaveRequest/:conjunctionId', checkManager, (req, res) => {
    let timeOffRequested; //conjunction data
    let duration = 0 //duration
    let status = req.body.status
    let employeeData; //data employee yg request leave
    Model.EmployeeLeave.findByPk(req.params.conjunctionId)
    .then(leaveData => {
        timeOffRequested = leaveData
        return leaveData.getEmployee()
    })
    .then(employee => {
        if (employee.timeOff < timeOffRequested) {
            throw `Time off request can not be taken due to employee's time off quota.`
        } else {
            employeeData = employee
            // res.send(employeeData)
            Model.EmployeeLeave.update(req.body, {
                    where: {
                        id: req.params.conjunctionId
                    }, 
                    individualHooks: true
                }
            )
        }
    })
    .then(() => {
        const nexmo = new Nexmo({
            apiKey: process.env.APIKEYfromManager,
            apiSecret: process.env.APISECRETfromManager
        })

        const from = 'Nexmo'
        const to = '628156615006'
        const text = `Your leave request has been approved by ${req.session.userLogin.name} - CutiYuk`

        nexmo.message.sendSms(from, to, text)

        if (timeOffRequested.status === 'Approved' && timeOffRequested.LeaveId === 2) {
            duration = timeOffRequested.duration
        }
        let timeOffLeft = employeeData.timeOff - duration
        // console.log(timeOffLeft)
        return Employee.update({
            timeOff: timeOffLeft }, 
            {   
            where: {
                id: employeeData.id
            },
            hooks: false
        })
    })
    .then(() => {
        res.redirect('/manager/leaveRequest')
    })
    .catch(err => {
        res.redirect(`/manager/leaveRequest/${req.params.conjunctionId}?err=${err}`)
    })
})

// router.get('/chart',(req,res)=>{
//     if (dotenv.error) throw dotenv.error
//     // console.log(dotenv)
//     let data = process.env.SECRET
//     res.render('pages/manager/chart',{data})
// })

module.exports = router