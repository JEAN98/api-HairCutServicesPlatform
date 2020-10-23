const chai = require('chai');
const expect = chai.expect;
let appoimentPath = 'appoiment';
const testHelper = require('./test.helper');



describe('Appoiment suites. Post/',()=>{
    
    let existingAppoiment = {
        shiftStarts: "2020-10-26 15:00:00",
        workerID: 2,
        servicesList: [
           64
        ]
    };

    it('should get an error based on existing appoiment', (done) => {
        chai.request(testHelper.baseURL)
        .post(appoimentPath)
        .set('Authorization', `Bearer ${testHelper.clientToken}`)
        .send(existingAppoiment)
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.status).to.be.equals('error');
            expect(res.body.details).to.be.equals('El total de tiempo solicitado coincide con una cita existente. Por favor intentarlo con un horario o fecha diferente');
            done();
          });
    });

    it('should get an error based on invalid shiftStarts', (done) => {
        let appoiment = existingAppoiment;
        appoiment.shiftStarts = "2030-10-26 22:00:00";
        chai.request(testHelper.baseURL)
        .post(appoimentPath)
        .set('Authorization', `Bearer ${testHelper.clientToken}`)
        .send(appoiment)
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.status).to.be.equals('error');
            expect(res.body.details).to.be.equals('La fecha o tiempo solicitado no coinciden con alguno de los horarios del establecimiento. Por favor intentarlo con alguna otra fecha u horario');
            done();
          });
    });

    it('should get an error based on invalid Services', (done) => {
        let appoiment = existingAppoiment;
        appoiment.servicesList = [ -100]
        chai.request(testHelper.baseURL)
        .post(appoimentPath)
        .set('Authorization', `Bearer ${testHelper.clientToken}`)
        .send(existingAppoiment)
        .end( function(err,res){
            expect(res).to.have.status(400);
            expect(res.body.status).to.be.equals('error');
            expect(res.body.details).to.be.equals('Algunos de los servicios solicitados no existen o están inactivos');
            done();
          });
    });

    it('should get an Unauthorized error when there is not token', (done) => {
        chai.request(testHelper.baseURL)
        .post(appoimentPath)
        .send(
            existingAppoiment
        )
        .end( function(err,res){
           testHelper.expectedUnauthorizedErrorWhenThereISNotToken(res,done);
        });
    });

    it('should get an Unauthorized Error based on invalid permissions', (done) => {
        chai.request(testHelper.baseURL)
        .post(appoimentPath)
        .set('Authorization', `Bearer ${testHelper.hsToken}`)
        .send(
            existingAppoiment
        )
        .end( function(err,res){
           testHelper.expectedUnauthorizedErrorBasedOnInvalidPermissions(res,done);
        });
    });

  

});
