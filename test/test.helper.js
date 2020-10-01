var randomEmail = require('random-email');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const expect = require('chai').expect;
const testHelper = {};

testHelper.clientToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MSwiZW1haWwiOiJoY0FjY291bnRzQHFhLmNvbSIsIm5hbWUiOiJHZXJvbmltbyBWZWdhIiwiYWNjb3VudFR5cGUiOiJDbGllbnRBY2NvdW50IiwiaWF0IjoxNjAxNDkzMzQ0LCJleHAiOjE2MDE1Nzk3NDR9.etsHHmB3CRJXTvXnM4lqzL5yVMCZ1nq0thFF_lJjYo18WG2-2jpm0Lq00dBQ9E5g4ZyoMhrBwP7tUv3mXQhwZA';
testHelper.hsToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MSwiZW1haWwiOiJzYWxvblRlc3RAZ21haWwuY29tIiwibmFtZSI6IlNhbG9uIFRlc3QiLCJhY2NvdW50VHlwZSI6IkhhaXJkcmVzc2luZ1NhbG9uIiwiaWF0IjoxNjAxNDkzMjkyLCJleHAiOjE2MDE1Nzk2OTJ9.qR89ulJfmEXYf9ZgR1vLDEfCC2-gQ1MK3Sn7JCZ2oZOq--fMkSml4JNDVlJr16euHPsByBVdzFWYqAl91WbLOw';
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
