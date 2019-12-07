import Sequelize from 'sequelize';
import config from '../config/dbconfig';

const env = process.env.NODE_ENV || "development";
const dbconfig = config[env];
const sequelize = new Sequelize( dbconfig.username, dbconfig.database, dbconfig.password, config );

const db = {};

db.User = require('./user')(sequelize, Sequelize);

// add db object associate

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
