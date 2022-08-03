const sequelize = require('../config/connection');
const { Unsub } = require('../models/');

const unsubSeedData = require('./unsubSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const unsubs = await Unsub.bulkCreate(unsubSeedData);

    process.exit(0);
};


seedDatabase();
