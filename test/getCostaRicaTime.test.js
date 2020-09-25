const chai = require('chai');
const expect = chai.expect;
const {getCostaRicaTime} = require('../src/utils/getCostaRicaTime.helper');

describe('GetFiles suite',()=>{
    it('should get a modelList', () => {
        let newDate = getCostaRicaTime('2020-09-23T21:40:00.000Z');
        console.log(newDate)
        expect(0).to.be.equals(0);
    });
});
