'use strict';
const HairdressingSalon = require('../config/db.config').hairdressingSalon;
const {BadRequestSequelizeError}  = require('../middleware/error/error');
const cleanHelper = require('../utils/cleanEntity.helper');
const attributesToBeRemoved = ['createdAt','updatedAt','password','gender_id'];


exports.get = async(params) => {
    let list = await HairdressingSalon.findAll({
        attributes: {exclude: ['gender_id','password','createdAt','updatedAt']},
        where: {is_active: params.isActive == undefined ? true : params.isActive}
    });
    return list;
}

exports.findHsalonByID = async(hairdressingSalonID) =>{
    let hsalon = await HairdressingSalon.findOne({
        where: { id: hairdressingSalonID, }
      })
      ;
    return cleanHelper.cleanEntity(hsalon,attributesToBeRemoved);
}

exports.create = async(newHairdressingSalon) => {
    let hsalon = await HairdressingSalon.create(newHairdressingSalon);
    return cleanHelper.cleanEntity(hsalon,attributesToBeRemoved);    
}

exports.findByEmail = async(email) => {
    let res = await HairdressingSalon.findAll({
        where: {email: email}
    });
    return res;
}
