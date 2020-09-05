module.exports = (db, sequelize, Sequelize) => {
    //Models/tables
    db.gender              = require('../models/gender.model')(sequelize, Sequelize);
    db.hairdressingSalon   = require('../models/hairdressingSalon.model')(sequelize, Sequelize);
    db.worker              = require('../models/worker.model')(sequelize, Sequelize);
    db.hairdressersService = require('../models/hairdressersService.model')(sequelize, Sequelize);
    db.client              = require('../models/clients.model')(sequelize, Sequelize);
    db.appoiment           = require('../models/appoiment.model')(sequelize, Sequelize);
    db.appoimentServices  = require('../models/appoimentService.model')(sequelize, Sequelize);

    //Association

    //hairdressingSalon
    db.gender.hasMany(db.hairdressingSalon, {
      foreignKey: 'gender_id'
    });

    db.hairdressingSalon.belongsTo(db.gender, {
      foreignKey: 'gender_id'
    });
 
    //Worker
    db.gender.hasMany( db.worker, {
      foreignKey: 'gender_id'
    });
    db.hairdressingSalon.hasMany( db.worker, {
      foreignKey: 'hairdressing_salon_id'
    });

    db.worker.belongsTo(db.gender, {
      foreignKey: 'gender_id'
    });  
    db.worker.belongsTo(db.hairdressingSalon, {
      foreignKey: 'hairdressing_salon_id'
    });  

    //hairdressersService
    db.gender.hasMany( db.hairdressersService, {
      foreignKey: 'gender_id'
    });
    db.hairdressingSalon.hasMany( db.hairdressersService, {
      foreignKey: 'hairdressing_salon_id'
    });

    db.hairdressersService.belongsTo(db.gender, {
      foreignKey: 'gender_id'
    }); 
    db.hairdressersService.belongsTo(db.hairdressingSalon, {
      foreignKey: 'hairdressing_salon_id'
    }); 
    
    //appoiment
    db.hairdressingSalon.hasMany( db.appoiment , {
      foreignKey: 'hairdressing_salon_id'
    });
    db.client.hasMany( db.appoiment , {
      foreignKey: 'client_id'
    });
    db.worker.hasMany( db.appoiment , {
      foreignKey: 'worker_id'
    });

    db.appoiment.belongsTo(db.hairdressingSalon, {
      foreignKey: 'hairdressing_salon_id'
    });
    db.appoiment.belongsTo(db.client, {
      foreignKey: 'client_id'
    });
    db.appoiment.belongsTo(db.worker, {
      foreignKey: 'worker_id'
    });


    //appoiment_services
    db.appoiment.hasMany( db.appoimentServices , {
      foreignKey: 'appoiment_id'
    });
    db.hairdressersService.hasMany( db.appoimentServices , {
      foreignKey: 'service_id'
    });

    db.appoimentServices.belongsTo(db.appoiment, {
      foreignKey: 'appoiment_id'
    });
    db.appoimentServices.belongsTo(db.hairdressersService, {
      foreignKey: 'service_id'
    });


  return db;
}