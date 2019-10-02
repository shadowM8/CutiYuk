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