const cleanEntity = (entity,attributeList) => {
    if(entity.toJSON)
    {
        entity = entity.toJSON();
    }

    if(entity.photo !== undefined && entity.photo !== null)
    {
        entity.photo =  entity.photo.toString('utf8');
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


const setCamelCaseStandardInList = (entityList) => {
    for (let index = 0; index < entityList.length; index++) {
        entityList[index] = setCamelCaseStandard(entityList[index]);
    }
    return entityList;
}

const setCamelCaseStandard = (entity) =>{

    if(entity.toJSON)
    {
        entity = entity.toJSON();
    }
    let entityAsString = JSON.stringify(entity);
    

    for (const [key, value] of Object.entries(entity)) {
        //console.log(`${key}: ${value}`);
        entityAsString = entityAsString.replace(key,getNewPropertyName(key));
        /*
        let newPropertyName = getNewPropertyName(key);
        entity[newPropertyName] = entity[key];
        delete entity[key];*/
    }
    
    return JSON.parse(entityAsString);
}

function getNewPropertyName(propertyName) {
    let wordSplitOut = propertyName.split('_');
    let newPropertyName = propertyName;
    if(wordSplitOut.length > 1)
    {
        let partA = wordSplitOut[0];
        newPropertyName = partA;
        for (let index = 1; index < wordSplitOut.length; index++) {
            let subString = wordSplitOut[index];
            subString = setCharAt(subString,0,subString[0].toUpperCase());
            let finalSubString = isID(subString);

            newPropertyName += finalSubString;
        }
    }
    return newPropertyName;
}


function isID(subString) {
    //In oder to replace Id to ID
   if(subString[0] === 'I' && subString.length == 2 && subString[1] === 'd')
   {
        return 'ID';
   }
   return subString;
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

module.exports = {
    cleanEntity,
    cleanEntityList,
    setCamelCaseStandard,
    setCamelCaseStandardInList
}




