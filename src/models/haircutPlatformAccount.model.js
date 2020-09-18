const {password_key} = require('../config/env');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    var haircutPlatformAccount = sequelize.define('haircut_platform_accounts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    clientID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'client_id'
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
        hooks: {
            beforeCreate: (haircutPlatformAccount, options) => {
                {
                    password = haircutPlatformAccount.password;
                    haircutPlatformAccount.password = bcrypt.hashSync(password_key + password, 12);
                   /* if (user.social_Token) {
                        user.social_Token = bcrypt.hashSync(password_key + user.social_Token, 1);
                    }*/
                }
            }
        }
    }  
  );
  return haircutPlatformAccount;
}
