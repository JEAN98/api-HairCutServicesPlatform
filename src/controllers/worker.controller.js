const repository = require('../repositories/worker.repository');

exports.findByHairDressingSalon = async(req, res) => {
   try {
       
       if(req.query.hairDressingSalonID != undefined )
       {
            let data = await repository.getWorkersByHairdressingSalon(req.query);
            res.status(200).send(data);
       }
       else{
        res.status(400).send({error: "The request does not the hairDressingSalonID paramater "});
       }
   
     } catch(e) {
         console.log(e);
        res.status(500).send({message: 'Internal server error'});
        }
};
