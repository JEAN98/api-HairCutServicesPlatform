const {Unauthorized}  = require('../middleware/error/error');

exports.checkPermissionLevel = (currentAccountLevl,accountLevelExpected) => {
    if(currentAccountLevl !== accountLevelExpected)
    {
        throw new Unauthorized('Invalid permissions to this resource');
    }
}