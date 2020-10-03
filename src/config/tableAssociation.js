const {getFilesName} = require('../utils/getFilesInDirectory');

module.exports = (db, sequelize, Sequelize) => {

  const pathModels = '../models/';
  let fileDataList = getFilesName('./src/models/');
  
  //load models
  fileDataList.forEach(fileData => {
    //console.log(pathModels +fileData.fileName)
     db[fileData.nameReduced] = require(pathModels +fileData.fileName )(sequelize, Sequelize);
  });

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
    db.client.hasMany( db.appoiment , {
      foreignKey: 'client_id'
    });
    db.worker.hasMany( db.appoiment , {
      foreignKey: 'worker_id'
    });

    db.appoiment.belongsTo(db.client, {
      foreignKey: 'client_id'
    });
    db.appoiment.belongsTo(db.worker, {
      foreignKey: 'worker_id'
    });


    //appoiment_services
    db.appoiment.hasMany( db.appoimentService , {
      foreignKey: 'appoiment_id'
    });
    db.hairdressersService.hasMany( db.appoimentService , {
      foreignKey: 'service_id'
    });

    db.appoimentService.belongsTo(db.appoiment, {
      foreignKey: 'appoiment_id'
    });
    db.appoimentService.belongsTo(db.hairdressersService, {
      foreignKey: 'service_id'
    });

    //haircutPlatformAccount
    db.client.hasMany(db.haircutPlatformAccount, {
      foreignKey: 'client_id'
    });
    
    db.haircutPlatformAccount.belongsTo(db.client, {
      foreignKey: 'client_id'
    });

    
    //FacebookAccount
    db.client.hasMany(db.facebookAccount, {
      foreignKey: 'client_id'
    });
  
    db.facebookAccount.belongsTo(db.client, {
      foreignKey: 'client_id'
    });

    //Schedule
    db.weekDay.hasMany(db.schedule, {
      foreignKey: 'weekday_id'
    });
    db.hairdressingSalon.hasMany(db.schedule, {
      foreignKey: 'hairdressing_salon_id'
    });
    
    db.schedule.belongsTo(db.weekDay, {
      foreignKey: 'weekday_id'
    });
    db.schedule.belongsTo(db.hairdressingSalon, {
      foreignKey: 'hairdressing_salon_id'
    });
    

    

  return db;
}