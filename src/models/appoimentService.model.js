module.exports = (sequelize, Sequelize) => {
    var appoimentService = sequelize.define('appoiment_services', {
    id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
    },
    isActive:{
        type: Sequelize.BOOLEAN,
        field: 'is_active',
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
  return appoimentService;
}
