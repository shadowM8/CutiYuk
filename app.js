const express = require('express')
const app = express()
const Model = require('./models')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const employee = require('./routes/employee')
const manager = require('./routes/manager')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
const port = process.env.PORT || 3000

app.use(session({
  secret: process.env.secretsauce
}))

app.get('/getAllEmployees', (req, res) => {
    Model.Employee.findAll()
    .then(allEmployees => {
        res.send(allEmployees)
    })
    .catch(err => {
        res.send(err)
    })
})

app.get('/addEmployee', (req,res)=>{
        Model.Department.findAll()
            .then(department => {
                let message = req.query.message
                res.render('pages/manager/addEmployeeForm', { 
                    department, message, 
                    role: "manager", 
                    isLogin: true 
                })
            })
            .catch(err => {
                res.send(err)
            })
    
})

app.get('/login', (req, res) => {
    let err = req.query.err
    res.render('pages/employees/login', {
        err: err,
        isLogin: req.session.userLogin
    })
})

app.post('/login', (req, res) => {
    let emp;
    Model.Employee.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(employee => {
        if (!employee) {
            throw 'Employee tidak terdaftar'
        }
        emp = employee
        return bcrypt.compare(req.body.password, employee.password)
    })
    .then(cek => {
        if (!cek) {
            throw `Password salah`
        } else {
            req.session.userLogin = {
                id: emp.id,
                nik: emp.nik,
                name: emp.name,
                role: emp.role,
                timeOff: emp.timeOff,
                DepartmentId: emp.DepartmentId,
                gender: emp.gender,
                createdAt: emp.createdAt
            }
            if (emp.role === 'manager') res.redirect('/manager/')
            else res.redirect('/employee')
        }
        
    })
    .catch(err => {
        res.redirect(`/login?err=${err}`)
    })
})

app.use('/employee', employee)
app.use('/manager', manager)

app.get('/', (req, res) => {
    let err = req.query.err
    res.render('pages/homepage', {
        err: err,
        role : null,
        isLogin: req.session.isLogin,
        logout : req.query.logout
    })
})

app.get('/session', (req, res) => {
    res.send(req.session)
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send(err)    
        } else {
            res.redirect('/?logout=Logout Succeed')
        }
    })
})

app.listen(port, () => {
    console.log('listening to port 3000')
})