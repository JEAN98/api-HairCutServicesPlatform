module.exports = (sequelize, Sequelize) => {
    var facebookAccount = sequelize.define('twitter_accounts', {
    id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
    },
    username: {
          type: Sequelize.STRING,
          allowNull: false    
    },
    twitterID: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'twitter_id',
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
