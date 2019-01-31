const router = require('express').Router()
const Model = require('../models')
const Employee = Model.Employee
const dotenv = require('dotenv').config()
const checkManager = require('../helpers/checkManager')

router.get('/', checkManager, (req, res) => {
    Employee.findOne({
        where: {
            id: req.session.userLogin.id,
            role: req.session.userLogin.role
        }
    })
        .then(manager => {
            res.render('pages/manager/managerDashboard', { manager })
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/addEmployee', checkManager, (req, res) => {
    Model.Department.findAll()
        .then(department => {
            let message = req.query.message
            res.render('pages/manager/addEmployeeForm', { department, message })
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
    .then(() => {
        let msg = `success add new Employee`
        res.redirect(`/manager/addEmployee/?message=${msg}`)
    })
    .catch(err => {
        res.redirect(`/manager/addEmployee/?message=${err}`)
    })
})

router.get('/leaveRequest', (req, res) => {
    Model.EmployeeLeave.findAll({
        include : [Model.Employee, Model.Leave],
        where: {
            // nanti employeeId manager dan DepartmentId manager dari session
            // DepartmentId: req.session.userLogin.DepartmentId
            DepartmentId: 1
        }
    })
        .then(leaveRequestData => {
            res.render('pages/manager/leaveRequestPage', { leaveRequestData })
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/leaveRequest/:conjunctionId', (req, res) => {
    let leaveData = null
    Model.EmployeeLeave.findByPk(req.params.conjunctionId)
        .then(leaveReasonData => {
            leaveData = leaveReasonData
            return leaveReasonData.getEmployee() 
        })
        .then(employeeData=>{
            res.render('pages/manager/leaveRequestForm', {leaveData, employeeData})
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/leaveRequest/:conjunctionId', (req, res) => {
    let duration = 0
    Model.EmployeeLeave.update(req.body, {
        where: {
            id: req.params.conjunctionId
        }
    })
    .then(() => {
        //KIRIM SMS DI SINI
        return Model.EmployeeLeave.findByPk(req.params.conjunctionId)
    })
    .then(employeeAskForLeave => {
        if (employeeAskForLeave.status === 'Approved' && employeeAskForLeave.LeaveId === 2) {
            duration = employeeAskForLeave.duration
        }
        return Employee.findByPk(employeeAskForLeave.EmployeeId)
    })
    .then(employeeData => {
        let timeOffLeft = employeeData.timeOff - duration
        Employee.update({
            timeOff: timeOffLeft
        }, {
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
        res.send(err)
    })
})

// router.get('/chart',(req,res)=>{
//     if (dotenv.error) throw dotenv.error
//     // console.log(dotenv)
//     let data = process.env.SECRET
//     res.render('pages/manager/chart',{data})
// })

module.exports = router