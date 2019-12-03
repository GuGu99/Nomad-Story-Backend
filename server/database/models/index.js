const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || "development";
const config = require('../config/dbconfig')[env];
const db = {};

const sequelize = new Sequelize( config.username, config.database, config.password, config );

db.User = require('./user')(sequelize, Sequelize);

// add db object associate

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
