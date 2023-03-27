const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const repoSchema = new Schema(
  {
    title: {
      type: 'string',
      required: true,
    },
    subtitle: {
      type: 'string',
      required: true,
    },

    visibility: {
      type: 'string',
      required: true,
    },
    language: {
      type: 'string',
      required: true,
    },
    star: {
      type: 'number',
      required: true,
    },
    commit: {
      type: 'number',
      required: true,
    },
    pr: {
      type: 'number',
      required: true,
    },
    user_id: {
      type: 'String',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Repo', repoSchema);
