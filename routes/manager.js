const router = require('express').Router()
const Model = require('../models')
const Employee = Model.Employee
const dotenv = require('dotenv').config()

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

router.get('/addEmployee', (req, res) => {
    Model.Department.findAll()
        .then(department => {
            let message = req.query.message
            res.render('pages/manager/addEmployeeForm', { department, message })
        })
        .catch(err => {
            res.send(err)
        })

})

router.post('/addEmployee', (req, res) => {
    let newEmployee = req.body
    Model.Employee.create({
        nik: newEmployee.nik,
        name: newEmployee.name,
        role: newEmployee.role,
        DepartmentId: newEmployee.DepartmentId,
        timeOff: 12
    })
        .then(() => {
            let msg = `success add new Employee`
            console.log(msg)
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
            DepartmentId: 1
        }
    })
        .then(leaveRequestData => {
            // res.send(leaveRequestData)
            res.render('pages/manager/leaveRequestPage', { leaveRequestData })
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})

router.get('/leaveRequest/:id', (req, res) => {
    let leaveData = null
    Model.EmployeeLeave.findByPk(req.params.id)
        .then(leaveReasonData => {
            leaveData = leaveReasonData
            return leaveReasonData.getEmployee()
            // res.send(conjunctionData)
            
        })
        .then(employeeData=>{
            // res.send(leaveData)
            res.render('pages/manager/leaveRequestForm', {leaveData, employeeData})
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/chart',(req,res)=>{
    if (dotenv.error) throw dotenv.error
    console.log(dotenv)
    let data = process.env.SECRET
    res.render('pages/manager/chart',{data})
})

module.exports = router