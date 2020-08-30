module.exports = (db, sequelize, Sequelize) => {
    //Models/tables
    db.gender = require('../models/gender.model')(sequelize, Sequelize);
    db.hairdressingSalon = require('../models/hairdressingSalon.model')(sequelize, Sequelize);

    //Association
    db.gender.hasMany(db.hairdressingSalon, {
      foreignKey: 'gender_id'
    });


    db.hairdressingSalon.belongsTo(db.gender, {
        foreignKey: 'gender_id'
      });

    return db;
}