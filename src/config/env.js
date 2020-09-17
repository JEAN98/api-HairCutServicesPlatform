
const env = {
    facebook_api_key: '***',
    facebook_api_secret: '***',
    secret_key: process.env.SECRET_KEY ,
    password_key: process.env.PASSWORD_KEY,
    database: process.env.DATABASE_NAME ,
    username: process.env.DATABASE_USERNAME ,
    password: process.env.DATABASE_PASSWORD ,
    host: process.env.DATABASE_HOST ,
    env: process.env.CURRENT_ENV ,
    port: process.env.PORT ,
    dialect: process.env.DIALECT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  };

module.exports = env;
