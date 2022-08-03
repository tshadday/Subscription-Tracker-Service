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
        sub_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cancel_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'user_id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "Subscription",
    });


module.exports = Subscription;