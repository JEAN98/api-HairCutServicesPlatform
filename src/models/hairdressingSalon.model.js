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
        allowNull: false     
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false     
    },
    shiftStarts:{
        type: Sequelize.TIME,
        allowNull: false,
        field: 'shift_starts',    
    },
    shiftEnds:{
        type: Sequelize.TIME,
        allowNull: false,
        field: 'shift_ends',        
    },
    lunchTime:{
        type: Sequelize.TIME,
        allowNull: false,
        field: 'lunch_time',            
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
        allowNull: false    
    },
    website:{
        type: Sequelize.STRING,
        allowNull: true     
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
  return hairdressingSalon;
}
