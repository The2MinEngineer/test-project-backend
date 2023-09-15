const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const connect = require('./db.js');
const userRoutes = require('./controllers/user.controller.js');
const { errorHandler } = require('./middlewares/index.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use(errorHandler);
app.use(express.json());

// MongoDB Connection
connect()
  .then(() => {
    console.log('DB connection succeeded.');
    // Start the server after successfully connecting to the database
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
  });
