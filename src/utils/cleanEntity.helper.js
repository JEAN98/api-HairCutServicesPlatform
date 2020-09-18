const cleanEntity = (entity,attributeList) => {
    if(entity.toJSON)
    {
        entity = entity.toJSON();
    }

    attributeList.forEach(attribute => {
        if(entity[attribute] !== undefined)
        {
            delete entity[attribute];
        }
    });
    return entity;
}

const cleanEntityList = (entityList,attributeList) => {
    for (let index = 0; index < entityList.length; index++) {
        entityList[index] = cleanEntity(entityList[index],attributeList);
    }
    return entityList;
}


module.exports = {
    cleanEntity,
    cleanEntityList
}




