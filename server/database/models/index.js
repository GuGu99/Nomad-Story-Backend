const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize,Sequelize);

// 변경 필요
// const config = require(path.join(__dirname, '..', 'config', 'dbconfig.json'))['test'];

// const user = User(sequelize, Sequelize);

// export { sequelize, Sequelize, user };

