const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const playerRoutes = require('./routes/playerRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', playerRoutes);

const User = require('./models/User');
const Player = require('./models/Player');

sequelize.sync().then(() => {
  console.log("Database & tables created!");

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error("Error creating database tables: ", error);
});
