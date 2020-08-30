module.exports = (sequelize, Sequelize) => {
    var hairdressersService = sequelize.define('hairdressers_services', {
    id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
    },
    title: {
          type: Sequelize.STRING,
          allowNull: false    
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false    
    },
    cost: {
        type: Sequelize.DOUBLE,
        allowNull: false    
    },
    timeDuration: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        field: 'time_duration',    
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_active',    
    },
    isMeasurable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_measurable',    
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
  return hairdressersService;
}
