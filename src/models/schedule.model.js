module.exports = (sequelize, Sequelize) => {
    var schedule = sequelize.define('schedule', {
    weekDayID: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'weekday_id',    
    },
    hairdressingSalonID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'hairdressing_salon_id',    
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
