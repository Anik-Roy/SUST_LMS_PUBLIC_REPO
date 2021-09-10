const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  fullName: {
    type: String
  },
  mobileNo: {
    type: String
  },
  isTeacher: {
    type: Boolean
  },
  universityId: {
    type: String
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;