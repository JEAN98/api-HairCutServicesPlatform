const env = {
    facebook_api_key: '***',
    facebook_api_secret: '***',
    secret_key: 'hdsp_token-advbc3',
    password_key: 'key-hdsp-123@',
    database: 'hcsp',
    username: 'postgres',
    password: 'Admin@123',
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
