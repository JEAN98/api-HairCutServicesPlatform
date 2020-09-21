const expect = require('chai').expect;
const testHelper = {};

testHelper.clientToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MjIsImVtYWlsIjoiaGNBY2NvdW50c0BxYS5jb20iLCJuYW1lIjoiR2Vyb25pbW8gVmVnYSIsImFjY291bnRUeXBlIjoiQ2xpZW50QWNjb3VudCIsImlhdCI6MTYwMDcxMTgzMywiZXhwIjoxNjAwNzk4MjMzfQ.Ww-Qx_iidQTPwlny8N8Ep1V1mjwqXb1io6KpgK5Jh35DaWosO3zGMqCrF8hGQVzbQQqiAWYzdwb75cjoYUBjug';
testHelper.hsToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MSwiZW1haWwiOiJzYWxvblRlc3RAZ21haWwuY29tIiwibmFtZSI6IlNhbG9uIFRlc3QiLCJhY2NvdW50VHlwZSI6IkhhaXJkcmVzc2luZ1NhbG9uIiwiaWF0IjoxNjAwNzA5OTc4LCJleHAiOjE2MDA3OTYzNzh9.tXm90VxiL7CiUPwyD3BvuF9nLxey5-ZBkfejaJIbjQqZGvYEHmyLEsV78rRAdWZpp9YRy0mxYCy80bnYcyViEQ';

testHelper.reviewUnauthorizedErrorWhenThereISNotToken = (response,done) => {
    expect(response).to.have.status(401);
    expect(response.body.details).to.be.equals('The request does not have the authentication header');
    done();
}



module.exports = testHelper;
