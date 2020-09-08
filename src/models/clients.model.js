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
        allowNull: false,
        unique: true   
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthday: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    isSoccialAccount: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      field: 'is_soccial_account'
    },
    isActive:{
      type: Sequelize.BOOLEAN,
      allowNull: false,
      va
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
