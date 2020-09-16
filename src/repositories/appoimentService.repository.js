'use strict';
const dbContext       = require('../config/db.config');
const AppoimentService = dbContext.appoimentService;
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt'];

exports.getAppoimentServiceList = async(appoimentID,clientID) => {
    let appoimentServiceList= await dbContext.sequelize.query(
        '  select  hs.title,hs.description,hs.cost,hs.time_duration_min \
            from appoiment_services as apservices \
            left join hairdressers_services as hs  \
            on hs.id = apservices.service_id \
            left join appoiments as ap \
            on ap.id = apservices.appoiment_id \
            where ap.id = :appoimentID  and ap.client_id = :clientID ',
        {
            replacements: { 
                appoimentID: appoimentID,
                clientID: clientID,
            },
            type: dbContext.sequelize.QueryTypes.SELECT
        },
      
    );
    return appoimentServiceList;
}


exports.create = async(servicesList) => {
    let newServicesCreated = await AppoimentService.bulkCreate(servicesList);
    return cleanHelper.cleanEntityList(newServicesCreated,attributesToBeRemoved);
} 