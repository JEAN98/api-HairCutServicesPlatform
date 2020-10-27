const env = require('./env');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    //logging: false,
    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    },
    dialectOptions: {
        useUTC: false, // for reading from database , this the default value
      },
      timezone: 'America/Costa_Rica', // for writing to database, // -6 of UTC
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Verify the conneciton works fine
const dbConnectionTest = async() => {
    try
    {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch(error)
    {
        console.error('Unable to connect to the database:', error);
    }
   
}

dbConnectionTest();


const dbContext = require('./tableAssociation')(db,sequelize,Sequelize);


module.exports = dbContext;
