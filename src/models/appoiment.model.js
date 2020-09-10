module.exports = (sequelize, Sequelize) => {
    var appoiment = sequelize.define('appoiments', {
    id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
    },
    shiftStarts: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'shift_starts',    
    },
    shiftEnds: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'shift_ends',    
    },
    totalTime: {
        type: Sequelize.TIME,
        allowNull: false,
        field: 'total_time',    
    },
    totalCost: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        field: 'total_cost',    
    },
    clientID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'client_id', 
    },
    workerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'worker_id', 
    },
    hairdressingSalonID: {
        type: Sequelize.INTEGER,
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
  return appoiment;
}
