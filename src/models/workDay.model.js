module.exports = (sequelize, Sequelize) => {
    var weekDay = sequelize.define('work_days', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    weekdayID:{
        type: Sequelize.STRING,
        allowNull: false,
        field: 'weekday_id',     
    },
    hairdressingSalonID:{
        type: Sequelize.STRING,
        allowNull: false,
        field: 'hairdressing_salon_id',   
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
