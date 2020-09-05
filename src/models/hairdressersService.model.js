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
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'time_duration',    
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_active',
        defaultValue: true     
    },
    hairdressingSalonID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'hairdressing_salon_id',   
    },
    genderID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'gender_id',   
    },
    isMeasurable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_measurable',    
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });
  return hairdressersService;
}
