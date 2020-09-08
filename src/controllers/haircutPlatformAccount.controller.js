const clientRepository                 = require('../repositories/client.repository');
const haircutPlatformAccountRepository = require('../repositories/haircutPlatformAccount.repository');

exports.create = async(req, res,next) => {
   try {
        let data = await repository.get();
        res.status(200).send(data);
     } catch(e) {
        res.status(500).send({message: 'Internal server error'});
        }
};
