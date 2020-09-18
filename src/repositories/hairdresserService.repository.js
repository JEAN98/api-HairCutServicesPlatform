'use strict';
const dbContext = require('../config/db.config');
const HairdressersService = dbContext.hairdressersService;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt'];

exports.getByHairdressingSalon = async(params) => {
    let servicesList = await HairdressersService.findAll({
        where: {
            is_active: params.isActive == undefined ? true : params.isActive,
            hairdressingSalonID: params.hairdressingSalonID
        }
    });
    return cleanHelper.cleanEntityList(servicesList,attributesToBeRemoved);
}

exports.create = async(newService) => {
    let service = await HairdressersService.create(newService);
    return cleanHelper.cleanEntity(service,attributesToBeRemoved);
}


exports.getTotalCostAndTimeByServicesResquested = async(servicesList) => {
    let totalCostAndTime = await dbContext.sequelize.query(
        'select SUM(cost) as total_cost, \
            SUM(time_duration_min) as total_time \
        from hairdressers_services \
        where id in (:servicesList)' ,
        {
            replacements: { 
               servicesList: servicesList,
            },
            type: dbContext.sequelize.QueryTypes.SELECT
        },
    );
    return totalCostAndTime ;
}

exports.getServicesListRequested = async(servicesList,workerID) => {
    let servicesListActive = await dbContext.sequelize.query(
            'select  hs.title,hs.id \
            from hairdressers_services as hs \
            left join workers on hs.hairdressing_salon_id = workers.hairdressing_salon_id \
            where  workers.id = :workerID  \
            and  hs.id in (:servicesList) \
            and hs.is_active = true \
            group by hs.id' ,
        {
            replacements: {
                workerID: workerID, 
               servicesList: servicesList,
            },
            type: dbContext.sequelize.QueryTypes.SELECT
        },
    );
    return servicesListActive ;
}