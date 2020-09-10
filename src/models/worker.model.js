module.exports = (sequelize, Sequelize) => {
    var worker = sequelize.define('workers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    identificationCard:{
      type: Sequelize.STRING,
      allowNull: false,
      field:  'identification_card',
      unique: true   
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
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field:  'is_active',
        defaultValue: true
    },
    hairdressingSalonID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'hairdressing_salon_id',   
    },
    genderID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'gender_id',   
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at',
    }
  });
  return worker;
}
