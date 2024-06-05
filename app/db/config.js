const Sequelize = require('sequelize');
const config = require('../../config');
const database = config.db.name
const username = config.db.username
const password = config.db.password
const db={}
const sequelize = new Sequelize(database, username, password, {
	host:  config.db.host,
	dialect: 'mysql',
	port: 3306,
   logging: console.log,
   pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
});


sequelize.authenticate().then(() => {
   db.connection=true
   console.log('Connection has been established successfully.');
}).catch((error) => {
   db.connection=false
   console.error('Unable to connect to the database: ', error);
});

sequelize.sync().then(() => {
   console.log('Table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});
db.sequelize=sequelize
module.exports = db;
