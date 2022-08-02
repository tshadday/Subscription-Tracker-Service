const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Unsub extends Model {}

Unsub.init(
    {
        sub_id:{},
        sub_title:{},
        sub_start:{},
        date_target:{},
        user_id: {}
    },{})

module.exports = Unsub;