const expect = require('chai').expect;
const {cleanEntity,cleanEntityList,setCamelCaseStandard} = require('../src/utils/cleanEntity.helper');


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


    it('should get a new property names', () => {
        let user = { 
                    client_name : 'Mary Test',
                    age: 12,
                    venues_address_billing: 'Alajuela, San Carlos, Quesada'
                };
        let userUpdated = setCamelCaseStandard(user);
        expect(userUpdated).to.eql(
            { 
                clientName : user.client_name,
                age: user.age,
                venuesAddressBilling: user.venues_address_billing
            }
        );
    });
});

