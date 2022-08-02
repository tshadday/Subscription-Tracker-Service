const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Subscription extends Model { }

Subscription.init(
    {
        sub_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        sub_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sub_start: {
            type:
            allowNull
        },
        target_endDate: {},
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'user_id',
            }
        }
    }, {});


module.exports = Subscription;