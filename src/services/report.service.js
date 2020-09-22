const reportRepository = require('../repositories/report.repository');
const {BadRequest, GeneralError} = require('../middleware/error/error');

exports.getPercentageOfServicesByHSalon = async(hairdressingSalonID) => {
     
    let appoimentServicesList = await reportRepository.getAppoimentServicesListByHS(hairdressingSalonID);
    let percentageOfServicesByHSalonList = [];
    for (let index = 0; index < appoimentServicesList.length; index++) {
        let service = appoimentServicesList[index].toJSON();
        service.percentage = (service.count * 100) / appoimentServicesList.length;
        service.serviceID = service.service_id;
        delete  service.service_id;  
        percentageOfServicesByHSalonList.push(service);
    }
    return percentageOfServicesByHSalonList;    
}
