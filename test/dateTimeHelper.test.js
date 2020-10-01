const chai = require('chai');
const expect = chai.expect;
const {getCostaRicaTime,areValidDates} = require('../src/utils/dateTime.helper');
const {BadRequest} = require('../src/middleware/error/error');
const { DateTime } = require("luxon");


describe('dateTimeHelper suite',()=>{
    
    it('should get a CostaRicaTime', () => {
        let newDate = getCostaRicaTime('2020-09-25T18:40:00.000Z');
        expect(newDate).to.be.equals('2020-09-25 12:40:00');
    });

   
    let invalidDateMessage = 'One of the dates selected does not have a correct value';

    it('should get an error based on invalid date', () => {
        let dateList = [];
        dateList.push(DateTime.fromFormat("2020-02-28","yyyy-MM-dd")); 
        dateList.push(DateTime.fromFormat("2020-02-30","yyyy-MM-dd")); 
        
        expect(function() {
            areValidDates(dateList)
        }).to.throw(BadRequest, invalidDateMessage);
    });
    
    it('should not get an error based on invalid date', () => {
        let dateList = [];
        dateList.push(DateTime.fromFormat("2020-02-28","yyyy-MM-dd")); 
        
        expect(function() {
            areValidDates(dateList)
        }).to.not.throw(BadRequest, invalidDateMessage);
    });

    it('should get an error based on date empty', () => {
        let dateList = [];
        dateList.push(''); 

        expect(function() {
            areValidDates(dateList)
        }).to.throw(BadRequest, 'One of the dates does not have a value assigned');
    });
});
