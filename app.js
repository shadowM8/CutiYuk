const express = require('express')
const app = express()
const Model = require('./models')
const dotenv = require('dotenv').config()
const bcrypt = require('bcryptjs')
const session = require('express-session')
const employee = require('./routes/employee')
const manager = require('./routes/manager')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.use(session({
  secret: process.env.secretsauce
}))

app.get('/login', (req, res) => {
    let err = req.query.err
    res.render('pages/employees/login', {
        err: err
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
            res.send(req.session)
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
        err: err
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
            res.send('Logout Succeed')
        }
    })
})

app.listen(3000, () => {
    console.log('listening to port 3000')
})