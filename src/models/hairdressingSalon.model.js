const {password_key} = require('../config/env');
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    var hairdressingSalon = sequelize.define('hairdressing_salons', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false    
    },
    description : {
        type: Sequelize.STRING,
        allowNull: false     
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true  
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false     
    },
    lunchStarts:{
        type: Sequelize.TIME,
        allowNull: false,
        field: 'lunch_starts',            
    },
    lunchEnds:{
        type: Sequelize.TIME,
        allowNull: false,
        field: 'lunch_ends',            
    },
    latitud:{
        type: Sequelize.DOUBLE,
        allowNull: false    
    },
    longitud:{
        type: Sequelize.DOUBLE,
        allowNull: false    
    },
    photo:{
        type: Sequelize.BLOB('long'),
        allowNull: true    
    },
    website:{
        type: Sequelize.STRING,
        allowNull: true     
    },
    genderID:{  //In order to match with the foreing key 
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'gender_id',
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_active',   
        defaultValue: true 
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
  },
   {
        hooks: {
            beforeCreate: (hairdressingSalon, options) => {
                {
                    password = hairdressingSalon.password;
                    hairdressingSalon.password = bcrypt.hashSync(password_key + password, 12);
                   /* if (user.social_Token) {
                        user.social_Token = bcrypt.hashSync(password_key + user.social_Token, 1);
                    }*/
                }
            }
        }
    }
  );
  return hairdressingSalon;
}
