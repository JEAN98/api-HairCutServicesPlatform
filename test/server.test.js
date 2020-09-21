var expect  = require('chai').expect;
var request = require('request');

describe('Server test. Get/',()=>{
    it('Main page. Get/ ', function(done) {
        request('http://localhost:3000' , function(error, response, body) {
            expect(body).to.equal('APIHairCutServicesPlatformDev');
            done();
        });
    });

});
