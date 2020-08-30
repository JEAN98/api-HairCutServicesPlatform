const repository = require('../repositories/hairdressingSalon.repository');


exports.findAll = async(req, res) => {

   try {
        let data = await repository.get();
        res.status(200).send(data);
     } catch(e) {
        res.status(500).send({message: 'Falha ao processar sua requisição'});
        }
};
