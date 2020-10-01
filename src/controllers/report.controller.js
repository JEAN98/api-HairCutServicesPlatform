const {getPercentageOfServicesByHSalon} = require('../services/report.service');
const {checkPermissionLevel} = require('../utils/checkAccess.helper');
const {entitySelected} = require('../utils/entityType');


exports.getReportAppoimentServiceList = async(req, res,next) => {
    try
    {
        checkPermissionLevel(req.token.accountType,entitySelected.HSalon);   
        let data = await getPercentageOfServicesByHSalon(req.token.sub);
        res.status(200).send(data);
    }
    catch(error)
    {
        next(error)
    }
};