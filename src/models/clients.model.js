module.exports = (sequelize, Sequelize) => {
    var client = sequelize.define('clients', {
    id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
    },
    firstName: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'first_name'    
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_name'    
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birth_day: {
        type: Sequelize.DATE,
        allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    }
  },
  {
    timestamps: false
  });
  return client;
}
