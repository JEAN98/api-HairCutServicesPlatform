const { DateTime } = require("luxon");
const {BadRequest} = require('../middleware/error/error');
const  { format } = require('date-fns');

function getCostaRicaTime(dateAsString) {
    if(dateAsString !== '')
    {
        //"yyyy-MM-DDTHH:mm:ss.SSSZ"
        let date = DateTime.fromISO(dateAsString);
        //return date.minus({hour: 6}); 
        
       // console.log(format(date, 'yyyy-MM-dd HH:mm:ss').toString())  
        return date.toFormat('yyyy-MM-dd HH:mm:ss'); 
    }
    else
        throw new BadRequest('One of the dates does not have a value assigned');
}

function isAValidDate(dateSelected) {
    if(dateSelected === '')
       throw new BadRequest('One of the dates does not have a value assigned');
    
    var date = DateTime.fromFormat(dateSelected,"yyyy-MM-dd");
    if(!date.isValid)
        throw new BadRequest('One of the dates selected does not have a correct value');
}

module.exports = {
    getCostaRicaTime,
    isAValidDate
}