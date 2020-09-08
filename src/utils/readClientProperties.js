exports.getClientObject = (entity) => {
    let client = {};
    client.firstName = entity.firstName;
    client.lastName  = entity.lastName;
    client.genderID  = entity.genderID;
    if(entity.birthday)
        client.birthday = entity.birthday;
        
    return client;
}