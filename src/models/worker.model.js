module.exports = (sequelize, Sequelize) => {
    var gender = sequelize.define('workers', {
    id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
    },
    firstName: {
          type: Sequelize.STRING,
          allowNull: false,
          field:  'first_name'  
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field:  'last_name'  
    },
    isActive: {
        type: Sequelize.STRING,
        allowNull: false,
        field:  'last_name'  
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
  return gender;
}
