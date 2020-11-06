const dbContext   = require('../config/db.config');

exports.getAppoimentServicesListByHS = async(hairdressingSalonID) => {
    let appoimentServicesList = await dbContext.sequelize.query(
             'select aps.service_id,count(*),hss.title,hss.code \
                from  appoiments as ap \
                left join clients as cl on ap.client_id = cl.id \
                left join appoiment_services as aps on ap.id = aps.appoiment_id \
                left join workers  as wk on wk.id = ap.worker_id \
                left join hairdressing_salons as hs on hs.id = wk.hairdressing_salon_id \
                left join hairdressers_services as hss on hss.id = aps.service_id \
                where hs.id = :hairdressingSalonID \
                group by aps.service_id,hss.title,hss.code',
             {
                 replacements: { 
                    hairdressingSalonID: hairdressingSalonID
                 },
                 type: dbContext.sequelize.QueryTypes.SELECT
             },
         );
     return appoimentServicesList ;
 }


 exports.getTop10Client = async(hairdressingSalonID) => {
    let top10List = await dbContext.sequelize.query(
             'select COUNT(*) as appoimentCount,  (cl.first_name||\' \'||cl.last_name) as clientName,client_id as clientID \
             from appoiments as ap \
             inner join clients as cl on cl.id = ap.client_id \
             inner join workers as wk on wk.id = ap.worker_id \
             inner join hairdressing_salons as hs on hs.id = wk.hairdressing_salon_id \
             where hs.id = :hairdressingSalonID \
             group by client_id,clientName \
             order by appoimentCount desc \
             LIMIT 10 ',
             {
                 replacements: { 
                    hairdressingSalonID: hairdressingSalonID
                 },
                 type: dbContext.sequelize.QueryTypes.SELECT
             },
         );
     return top10List ;
 }