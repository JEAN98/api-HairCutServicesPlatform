var randomEmail = require('random-email');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const expect = require('chai').expect;
const testHelper = {};

testHelper.clientToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6ODUsImVtYWlsIjoiZ29yaWpldEBrdXBvLmNyZWRpdHVuaW9uIiwibmFtZSI6IkFuZHJldyBWZWdhIiwiYWNjb3VudFR5cGUiOiJDbGllbnRBY2NvdW50IiwiaWF0IjoxNjAwNzM1MDI3LCJleHAiOjE2MDA4MjE0Mjd9.oMTeMs0nX_wi6OQrvXa2nfDRhrCdbcP0XQbABd9uiUmAjKvPhP4XurToA0Lq0TdOKCy8Ei8cZq8TMXTYuuxGNQ';
testHelper.hsToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MSwiZW1haWwiOiJzYWxvblRlc3RAZ21haWwuY29tIiwibmFtZSI6IlNhbG9uIFRlc3QiLCJhY2NvdW50VHlwZSI6IkhhaXJkcmVzc2luZ1NhbG9uIiwiaWF0IjoxNjAwODEyMzc1LCJleHAiOjE2MDA4OTg3NzV9.n2KLr1hvSDNXX2QvksOB_rto5mUoztvauWotDmShnQQ2BMSW2jEgdRikWdS4RyF3FnmX0Juf9a3W1Je7Q5co6A';
testHelper.invalidToken = 'invalidToken@$3%.asdfasdf.332dff';
testHelper.tokenExpired = '';
testHelper.baseURL = 'http://localhost:3000/api/';

function isTestCompleted(done) {
    if(done !== undefined)
        done();
}


testHelper.createRamdonIDCard = () => {
    let card = '';
    for (let index = 0; index < 9; index++) {
        let number = Math.floor(Math.random() * Math.floor(9));
        card += number.toString();
    }
    return card;
}

testHelper.createRamdonName =() => {
    return uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
}


testHelper.createRamdonEmail =() => {
   return randomEmail();
}

testHelper.expectedUnauthorizedErrorBasedOnInvalidPermissions = (response,done) => {
    expect(response).to.have.status(401);
    expect(response.body.status).to.be.equals('error');
    expect(response.body.details).to.be.equals('Invalid permissions to this resource');
    isTestCompleted(done);
}

testHelper.expectedUnauthorizedErrorWhenThereISNotToken = (response,done) => {
    expect(response).to.have.status(401);
    expect(response.body.status).to.be.equals('error');
    expect(response.body.details).to.be.equals('The request does not have the authentication header');
    isTestCompleted(done);
}

testHelper.expectedUnauthorizedErrorWhenTokenIsInvalid = (response,done) => {
    expect(response).to.have.status(401);
    expect(response.body.status).to.be.equals('error');
    expect(response.body.details).to.be.equals('The token is not valid');
    isTestCompleted(done);
}

testHelper.expectedBadRequestErrorBasedOnUniqueViolation = (response,done) => {
    expect(response).to.have.status(400);
    expect(response.body.details).to.not.be.undefined;
    expect(response.body.details.type).to.be.equals('unique violation');
    expect(response.body.details.message).to.not.be.undefined;
    isTestCompleted(done);
}

testHelper.expectedBadRequestErrorBasedOnAMissingField = (response,done) => {
    expect(response).to.have.status(400);
    expect(response.body.details.name).to.be.equals('ValidationError');
    expect(response.body.status).to.be.equals('error');
    isTestCompleted(done);
}

testHelper.expectedBadRequestErrorBasedOnInvalidConstraints = (response,done) => {
    expect(response).to.have.status(400);
    expect(response.body.status).to.be.equals('error');
    expect(response.body.details.message).to.be.equals('Some of the constraints are not defined properly or they does not exist in the database');
    isTestCompleted(done);
}

testHelper.expectedBadRequestErrorBasedOnInvalidField = (response,done) => {
    expect(response).to.have.status(400);
    expect(response.body.status).to.be.equals('error');
    expect(response.body.details.name).to.be.equals('ValidationError');
    isTestCompleted(done);
}

module.exports = testHelper;
