module.exports = (sequelize, Sequelize) => {
    var gender = sequelize.define('genders', {
    id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
    },
    population: {
          type: Sequelize.STRING,
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
  });
  return gender;
}
