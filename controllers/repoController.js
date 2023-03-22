const mongoose = require('mongoose');

const Repo = require('../models/repoModel');

// get all repo
getAllRepos = async (req, res) => {
  const repos = await Repo.find({});

  res.status(200).json(repos);
};

// get a single repo
const getSingleRepo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'invalid id' });
  }
  const repo = await Repo.findById(id);

  if (!repo) {
    return res.status(404).json({ error: 'No repo found' });
  }
  res.status(200).json(repo);
};

// post a new repo
const postRepo = async (req, res) => {
  const data = req.body;
  try {
    const repo = await Repo.create({
      ...data,
    });

    res.status(200).json(repo);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// delete a repo

// update a repo

module.exports = {
  postRepo,
  getAllRepos,
  getSingleRepo,
};
