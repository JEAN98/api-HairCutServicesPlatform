const expect = require('chai').expect;
const {cleanEntity,cleanEntityList} = require('../src/utils/cleanEntity.helper');


describe('cleanEntity suite',()=>{

    it('should get an entity cleaned', () => {
    let entity = { createdAt: '2019',updatedAt: '2020',id:22,name: 'Mary'}
    let attributesToBeRemoved = ['createdAt','updatedAt'];

    let newEntity = cleanEntity(entity,attributesToBeRemoved);
    expect(newEntity).to.eql({id:22,name: 'Mary'});
    });


    it('should get an entityList cleaned', () => {
    let entityList = [
        { createdAt: '2019',updatedAt: '2020',id:22,name: 'Mary'},
        { createdAt: '2019',updatedAt: '2020',id:20,name: 'Geronimo'}
    ];
    let attributesToBeRemoved = ['createdAt','updatedAt'];

    let newEntity = cleanEntityList(entityList,attributesToBeRemoved);
    expect(newEntity).to.eql([
            {id:22,name: 'Mary'},
            {id:20,name: 'Geronimo'}
        ]);
    });
});

