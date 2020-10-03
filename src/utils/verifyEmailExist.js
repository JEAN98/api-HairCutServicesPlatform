const hairdressingSalonRepository = require('../repositories/hairdressingSalon.repository');
const haircutPlatformClient = require('../repositories/haircutPlatformAccount.repository');
const {getEmailList} = require('../repositories/isEmalExits.repository');

exports.isEmailExist = async (newEmail) => {
    
    let emailList = await getEmailList(newEmail);
    if(emailList.length > 0)
    {
        return {
            error: 'The email already exists',
            isEmailAccepted: false,
            value: newEmail
        };
    }
    return {isEmailAccepted: true}    
}

