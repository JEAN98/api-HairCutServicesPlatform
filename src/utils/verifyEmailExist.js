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
    /*
    let account = await hairdressingSalonRepository.findByEmail(newEmail);
    if(account.length > 0)
    {
        return buildErrorMessage("HairdressingSalon",newEmail);
    }
    
    let platformClient = await haircutPlatformClient.findByEmail(newEmail);
    if(platformClient.length > 0)
    {
        return buildErrorMessage("Client",newEmail);
    }*/


    return {isEmailAccepted: true}    
}

const buildErrorMessage = (errorFrom,email) => {
    console.log(errorFrom)
    return {
        error: 'The email already exists',
        isEmailAccepted: false,
        value: email
    }
}

