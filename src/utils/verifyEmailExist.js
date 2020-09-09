const hairdressingSalonRepository = require('../repositories/hairdressingSalon.repository');
const haircutPlatformClient = require('../repositories/haircutPlatformAccount.repository');
exports.isEmailExist = async (newEmail) => {
   
    let account = await hairdressingSalonRepository.findByEmail(newEmail);
    if(account.length > 0)
    {
        return buildErrorMessage("HairdressingSalon");
    }
    
    let platformClient = await haircutPlatformClient.findByEmail(newEmail);
    if(platformClient.length > 0)
    {
        return buildErrorMessage("Client");
    }

    return {isEmailAccepted: true}    
}

const buildErrorMessage = (errorFrom) => {
    console.log(errorFrom)
    return {
        error: 'The email already exists as ' + errorFrom,
        isEmailAccepted: false
    }
}

