const expect = require('chai').expect;
const {Unauthorized} = require('../src/middleware/error/error');
const {checkPermissionLevel} = require('../src/utils/checkAccess.helper');


describe('checkAccess suite',()=>{

    it('should throws error in checkPermission with invalid credentials', () => {
    expect(function() {
        checkPermissionLevel("UserRole1", "UserRole100")
        }).to.throw(Unauthorized, 'Invalid permissions to this resource');
    });

    it('should not thrown error in checkPermission with valid credentials', () => {
        expect(function() {
            checkPermissionLevel("UserRole1", "UserRole1")
            }).to.not.throw(Unauthorized, 'Invalid permissions to this resource');
    });

});


