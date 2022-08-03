const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Unsub extends Model {}

Unsub.init(
    {
        cancel_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        sub_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'Subscription',
                key: 'sub_id'
            }
        },
        unsub_info:{
            type: DataTypes.STRING
        },
    },{
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "Unsub",
    })

module.exports = Unsub;