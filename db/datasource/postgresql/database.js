const Sequelize = require('sequelize');
const config = require('../../../config');

const sequelize = new Sequelize(
  config.get('DB_NAME'),
  config.get('DB_USER'),
  config.get('DB_PASS'),
  {
    host: config.get('DB_HOST'),
    port: config.get('DB_PORT'),
    dialect: config.get('DB_DIALECT'),
    operatorsAliases: Sequelize.Op,
    define: {
      underscored: true,
    },
    dialectOptions: {
      ssl: true,
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

module.exports = sequelize;
