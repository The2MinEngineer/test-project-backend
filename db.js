const mongoose = require('mongoose');

const dbUri = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

module.exports = () => {
  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB connected successfully.');
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error.message);
      throw error;
    });
};
