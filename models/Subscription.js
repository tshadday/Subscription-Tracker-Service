const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Subscription extends Model {}

Subscription.init()

module.exports = Subscription;