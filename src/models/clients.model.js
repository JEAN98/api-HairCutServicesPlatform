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
    birthday: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    isSoccialAccount: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      field: 'is_soccial_account'
    },
    genderID:{
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'gender_id'
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
