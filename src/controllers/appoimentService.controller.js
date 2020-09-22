const repository = require('../repositories/appoimentService.repository');

exports.getAppoimentServiceList = async(req, res,next) => {
   try {
        let data = await repository.getAppoimentServiceList(req.query.appoimentID);
        res.status(200).send(data);
     } catch (error) {
         next(error)
   }
};
