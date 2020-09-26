const chai = require('chai');
const expect = chai.expect;
const {getCostaRicaTime} = require('../src/utils/getCostaRicaTime.helper');

describe('GetFiles suite',()=>{
    it('should get a modelList', () => {
        let newDate = getCostaRicaTime('2020-09-25T18:40:00.000Z');
        expect(newDate).to.be.equals('2020-09-25 12:40:00');
    });
});
