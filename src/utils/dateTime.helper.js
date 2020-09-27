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

function areValidDates(dateList) {

    //The dates are using the luxon parser
    dateList.forEach(date => {
        if(date === '')
            throw new BadRequest('One of the dates does not have a value assigned');
        if(!date.isValid)
            throw new BadRequest('One of the dates selected does not have a correct value');
    });
}

module.exports = {
    getCostaRicaTime,
    areValidDates
}