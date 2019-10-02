const config = require('../../../config');

const db = {
  development: {
    username: config.get('DB_USER'),
    password: config.get('DB_PASS'),
    database: config.get('DB_NAME'),
    host: config.get('DB_HOST'),
    dialect: config.get('DB_DIALECT'),
    logging: false,
  },
  production: {
    username: config.get('DB_USER'),
    password: config.get('DB_PASS'),
    database: config.get('DB_NAME'),
    host: config.get('DB_HOST'),
    dialect: config.get('DB_DIALECT'),
    // define: {
    //   underscored: true,
    // },
    // dialectOptions: {
    //   ssl: true,
    // },
    logging: false,
  },
};

module.exports = db;
