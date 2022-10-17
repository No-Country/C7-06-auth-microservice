const { sequelize } = require('../models');

// connect to database
async function connectDB() {
  try {
    // await sequelize.sync({ force: true });
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// ping route for testing
const ping = async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ message: 'ok' });
  } catch (error) {
    res.status(500).json({ message: 'error' });
  }
};

module.exports = { connectDB, ping };
