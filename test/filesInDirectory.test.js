const chai = require('chai');
const expect = chai.expect;
const {getFilesName,FileData} = require('../src/utils/getFilesInDirectory');


describe('GetFiles suite',()=>{

    it('should get a routeList', () => {
        let routeList = getFilesName('./src/routes/');
        
        expect(routeList).to.be.an('array')
        expect(routeList.length).to.be.gt(0);
        expect(routeList[0].nameReduced).to.not.be.undefined;
        expect(routeList[0].fileName).to.not.be.undefined;
    });

    it('should get a modelList', () => {
        let routeList = getFilesName('./src/models/');
        
        expect(routeList).to.be.an('array')
        expect(routeList.length).to.be.gt(0);
        expect(routeList[0].nameReduced).to.not.be.undefined;
        expect(routeList[0].fileName).to.not.be.undefined;
    });
});
