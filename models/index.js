const User = require('./User');
const Subscription = require('./Subscription');
const Unsub = require('./Unsub');

User.hasMany(Subscription, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

Subscription.belongsTo(User, {
    foreignKey: "user_id"
})

Subscription.hasOne(Unsub, {
    foreignKey: "sub_id",
    onDelete: "CASCADE"
})

Unsub.belongsTo(Subscription, {
    foreignKey: "sub_id"
})

module.exports = { User, Subscription, Unsub };