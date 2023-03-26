const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const schema = mongoose.Schema;

const userSchema = new schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw new Error('Please fill up all.');
  }

  // check email is valid
  if (!validator.isEmail(email)) {
    throw new Error(
      'Error: The email address you entered is invalid. Please check the format of your email address and try again.'
    );
  }

  // password must be lowercase, uppercase, number, symbol and 8+ chars
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      'Error: Your password must be at least 8 characters long and include a combination of uppercase and lowercase letters, numbers, and symbols. Please choose a stronger password to protect your account.'
    );
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw Error('Email is already used.');
  }

  // encrypt password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create a user
  const user = await this.create({ email: email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw new Error('Please fill up all.');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('"Invalid Password. Please try again."');
  }
  return user;
};

module.exports = mongoose.model('User', userSchema);
