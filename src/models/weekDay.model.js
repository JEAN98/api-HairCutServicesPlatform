module.exports = (sequelize, Sequelize) => {
    var weekDay = sequelize.define('weekdays', {
    id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
    },
    weekday:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true     
    },
    letter:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true   
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    }
  });
  return weekDay;
}
