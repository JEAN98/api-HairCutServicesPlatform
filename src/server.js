const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = require('./app');

//Run server
app.listen(PORT);

console.log(process.env.API_NAME);


module.exports = app;