const express = require('express')
const app = express()
const employee = require('./routes/employee')
const manager = require('./routes/manager')
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.use('/employee', employee)
app.use('/manager', manager)

app.get('/', (req, res) => {
    res.send('/')
})

app.listen(3000, () => {
    console.log('listening to port 3000')
})