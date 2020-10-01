const clientRepository = require('../repositories/client.repository');

const getClientObject = (entity) => {
    let client = {};
    client.firstName = entity.firstName;
    client.lastName  = entity.lastName;
    client.genderID  = entity.genderID;
    client.age       = entity.age;
    if(entity.birthday)
        client.birthday = entity.birthday;
        
    return client;
}

exports.createClientRerefence = async (newClient,isSoccialAccount) => {
    let clientObject = getClientObject(newClient);
    clientObject.isSoccialAccount = isSoccialAccount;

    return await clientRepository.create(clientObject);
}

exports.getMappedAccountWithClient = (client,account) => {
    account.firstName = client.firstName;
    account.lastName = client.lastName;
    account.genderID = client.genderID;
    account.age     = client.age;
    if(client.birthday)
        account.birthday = client.birthday;
    return account;
}
