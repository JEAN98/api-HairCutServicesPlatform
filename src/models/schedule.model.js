module.exports = (sequelize, Sequelize) => {
    var schedule = sequelize.define('schedules', {
    weekDayID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'weekday_id',
          primaryKey: true    
    },
    hairdressingSalonID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'hairdressing_salon_id',
        primaryKey: true    
    },
    shiftStarts: {
        type: Sequelize.TIME,
        allowNull: false,
        field: 'shift_starts',    
    },
    shiftEnds: {
        type: Sequelize.TIME,
        allowNull: false,
        field: 'shift_ends',    
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
  return schedule;
}
