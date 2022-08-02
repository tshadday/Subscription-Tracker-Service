const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    // Takes input password and compares to saved password
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
};

User.init()

module.exports = User;