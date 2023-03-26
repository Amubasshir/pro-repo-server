const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

module.exports = mongoose.model('User', userSchema);
