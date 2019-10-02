const app = require('./server');
const config = require('./config');
const port = config.get('PORT')

app.listen(port, () => {
  console.log(`employee management CutiYuk API is listening on port ${port}`);
})
