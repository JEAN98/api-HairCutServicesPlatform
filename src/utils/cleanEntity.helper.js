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


const replaceUnderScoreStandardFromList = (entityList) => {
    for (let index = 0; index < entityList.length; index++) {
        entityList[index] = removeUnderScoreStandard(entityList[index]);
    }
    return entityList;
}

const replaceUnderScoreStandardFromEntity = (entity) =>{

    if(entity.toJSON)
    {
        entity = entity.toJSON();
    }

}

function underScoreToCamelCase(object,propertyName) {
    let wordSplitOut = propertyName.split('_');
    let result = propertyName;
    if(wordSplitOut.length > 1)
    {
        let partA = wordSplitOut[0];
        result = partA;
        for (let index = 1; index < wordSplitOut.length; index++) {
            let subString = wordSplitOut[index];
            subString = setCharAt(subString,0,subString[0].toUpperCase());
            result += subString;
        }
    }
    return result;
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

module.exports = {
    cleanEntity,
    cleanEntityList,
    replaceUnderScoreStandardFromEntity,
    replaceUnderScoreStandardFromList,
    underScoreToCamelCase
}




