const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  sector: String,
  agreeToTerms: Boolean,
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
