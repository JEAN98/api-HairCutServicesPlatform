const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = require('./app');


console.log(process.env.PORT);
//Run server
app.listen(PORT);



module.exports = app;