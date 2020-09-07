const session = require('../controllers/sesion.controller');

module.exports = function(app) {
   
    // Create a new account
    app.post('/api/session', session.createSession);
}
