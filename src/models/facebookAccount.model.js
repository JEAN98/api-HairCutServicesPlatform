module.exports = (sequelize, Sequelize) => {
    var facebookAccount = sequelize.define('facebook_accounts', {
    id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
    },
    email: {
          type: Sequelize.STRING,
          allowNull: false    
    },
    facebookID: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'facebook_id',
    },
    token:{
      type: Sequelize.STRING,
        allowNull: false
    },
    clientID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'client_id',
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
  return facebookAccount;
}
