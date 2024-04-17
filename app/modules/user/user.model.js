const mongoose = require('mongoose');
const { isEmail } = require('validator');
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 3,
      maxLength: 55,
      unique: true,
    },
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    number: {
      type: String,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      validate: [isEmail],
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      trim: true,
    },
    adress: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('user', userSchema);
