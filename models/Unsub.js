const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Unsub extends Model {}

Unsub.init(
    {
        sub_name:{
            type: DataTypes.STRING,
            references: {
                model: 'Subscription',
                key: 'sub_name'
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