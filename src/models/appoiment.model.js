module.exports = (sequelize, Sequelize) => {
    var appoiment = sequelize.define('appoiments', {
    id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
    },
    shift_starts: {
          type: Sequelize.DATE,
          allowNull: false,
          field: 'shift_starts',    
    },
    shift_ends: {
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
