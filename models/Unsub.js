const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Unsub extends Model {}

Unsub.init()

module.exports = Unsub;