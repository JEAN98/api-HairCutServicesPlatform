let chai = require('chai');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
let url= 'http://localhost:3000/api/';
let path = 'hairdresserService';

describe('HairdresserServices suite. Post/',()=>{
    let serviceTitle = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
    let service = {
        title: serviceTitle,
        code: serviceTitle +"- servcie",
        description: "Service description",
        cost: 1000,
        timeDuration: 20,
        genderID: 1,
        isMeasurable: true 
    }

    it('should create a new service', (done) => {
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MSwiZW1haWwiOiJzYWxvblRlc3RAZ21haWwuY29tIiwibmFtZSI6IlNhbG9uIFRlc3QiLCJhY2NvdW50VHlwZSI6IkhhaXJkcmVzc2luZ1NhbG9uIiwiaWF0IjoxNjAwNzA5OTc4LCJleHAiOjE2MDA3OTYzNzh9.tXm90VxiL7CiUPwyD3BvuF9nLxey5-ZBkfejaJIbjQqZGvYEHmyLEsV78rRAdWZpp9YRy0mxYCy80bnYcyViEQ';
        chai.request(url)
        .post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(
            service
        )
        .end( function(err,res){
            expect(res).to.have.status(201);
            expect(res.body.title).to.be.equals(service.title);
            expect(res.body.cost).to.be.equals(service.cost);
            expect(res.body.timeDuration).to.be.equals(service.timeDuration);
            expect(res.body.hairdressingSalonID).to.be.equals(1);
            done();
        });
    });


    it('should get an Unauthorized error when token is invalid', (done) => {
        let token = 'InvalidToken';
        chai.request(url)
        .post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(
            service
        )
        .end( function(err,res){
            expect(res).to.have.status(401);
            expect(res.body.details).to.be.equals('The token is not valid');
            done();
        });
    });

    it('should get an Unauthorized error when there is not token', (done) => {
        chai.request(url)
        .post(path)
        .send(
            service
        )
        .end( function(err,res){
            expect(res).to.have.status(401);
            expect(res.body.details).to.be.equals('The request does not have the authentication header');
            done();
        });
    });

    it('should get a bad request error based on a missing fields', (done) => {
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJIYWlyQ3V0U2VydmljZXNQbGF0Zm9ybSIsInN1YiI6MSwiZW1haWwiOiJzYWxvblRlc3RAZ21haWwuY29tIiwibmFtZSI6IlNhbG9uIFRlc3QiLCJhY2NvdW50VHlwZSI6IkhhaXJkcmVzc2luZ1NhbG9uIiwiaWF0IjoxNjAwNzA5OTc4LCJleHAiOjE2MDA3OTYzNzh9.tXm90VxiL7CiUPwyD3BvuF9nLxey5-ZBkfejaJIbjQqZGvYEHmyLEsV78rRAdWZpp9YRy0mxYCy80bnYcyViEQ';
        chai.request(url)
        .post(path)
        .set('Authorization', `Bearer ${token}`)
        .send(
            {
                title: 'title_example'
            }
        )
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.details.name).to.be.equals('ValidationError');
            done();
        });
    });
    
});
