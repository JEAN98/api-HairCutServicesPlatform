const chai = require('chai');
const expect = chai.expect;
const {getCostaRicaTime,isAValidDate} = require('../src/utils/dateTime.helper');
const {BadRequest} = require('../src/middleware/error/error');
describe('dateTimeHelper suite',()=>{
    
    it('should get a CostaRicaTime', () => {
        let newDate = getCostaRicaTime('2020-09-25T18:40:00.000Z');
        expect(newDate).to.be.equals('2020-09-25 12:40:00');
    });

   
    let invalidDateMessage = 'One of the dates selected does not have a correct value';
    it('should get an error based on invalid date', () => {
        expect(function() {
            isAValidDate('2020-02-30')
        }).to.throw(BadRequest, invalidDateMessage);
    });
    
    it('should not get an error based on invalid date', () => {
        expect(function() {
            isAValidDate('2020-02-27')
        }).to.not.throw(BadRequest, invalidDateMessage);
    });

    it('should get an error based on date empty', () => {
        expect(function() {
            isAValidDate('')
        }).to.throw(BadRequest, 'One of the dates does not have a value assigned');
    });
});
