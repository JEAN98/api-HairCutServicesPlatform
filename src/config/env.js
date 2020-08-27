const env = {
    facebook_api_key: '***',
    facebook_api_secret: '***',
    secret_key: '***',
    password_key: '***',
    database: 'mydb',
    username: 'root',
    password: 'changeme',
    host: 'localhost',
    port:5432,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  };

module.exports = env;
