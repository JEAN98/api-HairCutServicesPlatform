const reportRepository = require('../repositories/report.repository');
const {BadRequest, GeneralError} = require('../middleware/error/error');
const {setCamelCaseStandardInList} = require('../utils/cleanEntity.helper');


async function getPercentageOfServicesByHSalon(hairdressingSalonID) {
     
    let appoimentServicesList = await reportRepository.getAppoimentServicesListByHS(hairdressingSalonID);
    let percentageOfServicesByHSalonList = [];

    let totalCount = 0;
    appoimentServicesList.forEach(service => {
        totalCount += parseInt(service.count);
   });
    
    console.log(appoimentServicesList,totalCount)
    for (let index = 0; index < appoimentServicesList.length; index++) {
        let service = appoimentServicesList[index];
        service.percentage = calculatePercentage(service.count,totalCount);
        service.serviceID = service.service_id;
        delete  service.service_id;  
        percentageOfServicesByHSalonList.push(service);
    }
    return percentageOfServicesByHSalonList;    
}


function calculatePercentage(count,totalCount) {
    let percentage = ((parseInt(count) * 100) / totalCount).toPrecision(4);
    
    return parseFloat(percentage) ;
}


async function getTop10Clients(hairdressingSalonID){
    let top10List = await reportRepository.getTop10Client(hairdressingSalonID);

    return setCamelCaseStandardInList(top10List);
}


exports.getReports = async(hairdressingSalonID) =>{
    let percentageOfServices = await getPercentageOfServicesByHSalon(hairdressingSalonID);
    let top10Clients = await getTop10Clients(hairdressingSalonID);

    return {
        percentageOfServices: percentageOfServices,
        topClients: top10Clients
    }
}