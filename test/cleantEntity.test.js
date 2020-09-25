const expect = require('chai').expect;
const {cleanEntity,cleanEntityList,setCamelCaseStandard,setCamelCaseStandardInList} = require('../src/utils/cleanEntity.helper');


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
        let userList = [{ 
                    client_name : 'Mary Test',
                    age: 12,
                    venues_address_billing: 'Alajuela, San Carlos, Quesada'
                },{ 
                    client_name : 'Mary Test',
                    age: 12,
                    venues_address_billing: 'Alajuela, San Carlos, Quesada'
                }];
        let userUpdated = setCamelCaseStandardInList(userList);

        expect(userUpdated).to.be.an('array')
        expect(userUpdated[0].clientName).not.be.undefined;
        expect(userUpdated[0].age).not.be.undefined
        expect(userUpdated[0].venuesAddressBilling).not.be.undefined;
        expect(userUpdated[0].client_name).be.undefined;
        expect(userUpdated[0].venues_address_billing).be.undefined;
    });
});

