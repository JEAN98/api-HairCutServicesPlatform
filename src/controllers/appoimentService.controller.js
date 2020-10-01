const repository = require('../repositories/appoimentService.repository');
const  {setCamelCaseStandardInList} = require('../utils/cleanEntity.helper');
exports.getAppoimentServiceList = async(req, res,next) => {
   try {
        let data = await repository.getAppoimentServiceList(req.query.appoimentID);
        res.status(200).send(setCamelCaseStandardInList(data));
     } catch (error) {
         next(error)
   }
};
