const service = require('../services/timeSheet.service');

exports.getTimeSheetsAvailableByWorker = async(req,res,next) =>{
    try 
    {
        let bodyResponse = await service.getTimeSheetsAvailableByWorker(req.query);
        res.status(200).send(bodyResponse);
    }
    catch (error) 
    {
        next(error);
    }
}