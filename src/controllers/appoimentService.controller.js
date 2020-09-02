const repository = require('../repositories/appoimentService.repository');
const { BadRequest,GeneralError } = require('../utils/error');

exports.findAll = async(req, res,next) => {

   try {
        let data = await repository.get();
        res.status(200).send(data);
     } catch(e) {
        //throw new GeneralError('sdfsd');
         console.log(e);
         next( new GeneralError('sdfsd'));
      }
};
