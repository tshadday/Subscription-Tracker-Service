const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Unsub extends Model {}

Unsub.init(
    { 
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
        unsub_info:{
            type: DataTypes.STRING
        },
        sub_id : {
            type: DataTypes.INTEGER,
            references: {
                model: "subscription", 
                key: "id"
            }
        }
    },{
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "unsub",
    })

module.exports = Unsub;