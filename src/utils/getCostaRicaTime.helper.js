const { DateTime } = require("luxon");
const {BadRequest} = require('../middleware/error/error');
function getCostaRicaTime(dateAsString) {
    if(dateAsString !== '')
    {
        //"yyyy-MM-DDTHH:mm:ss.SSSZ"
        let date = DateTime.fromISO(dateAsString);
        //return date.minus({hour: 6});   
        return date; 
    }
    else
        throw new BadRequest('Invalid value');
   
}


module.exports = {
    getCostaRicaTime
}