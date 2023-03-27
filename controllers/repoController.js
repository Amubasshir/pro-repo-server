const mongoose = require('mongoose');

const Repo = require('../models/repoModel');

// get all repo
const getAllRepos = async (req, res) => {
  const user_id = req.user._id;
  const repos = await Repo.find({ user_id }).sort({ createdAt: -1 });

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
  const { title, subtitle, visibility, language, star, commit, pr } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push('title');
  }
  if (!subtitle) {
    emptyFields.push('subtitle');
  }
  if (!visibility) {
    emptyFields.push('visibility');
  }
  if (!language) {
    emptyFields.push('language');
  }

  if (!star) {
    emptyFields.push('star');
  }
  if (!commit) {
    emptyFields.push('commit');
  }
  if (!pr) {
    emptyFields.push('pr');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all fields', emptyFields });
  }

  try {
    const user_id = req.user._id;
    const repo = await Repo.create({
      ...req.body,
      user_id,
    });

    res.status(200).json(repo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete a repo
const deleteRepo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'invalid id' });
  }
  const repo = await Repo.findOneAndDelete({ _id: id });
  if (!repo) {
    return res.status(404).json({ error: 'NO project found' });
  }

  res.status(200).json(repo);
};

// update a repo
const updateRepo = async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, visibility, language, star, commit, pr } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push('title');
  }
  if (!subtitle) {
    emptyFields.push('subtitle');
  }
  if (!visibility) {
    emptyFields.push('visibility');
  }
  if (!language) {
    emptyFields.push('language');
  }

  if (!star) {
    emptyFields.push('star');
  }
  if (!commit) {
    emptyFields.push('commit');
  }
  if (!pr) {
    emptyFields.push('pr');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all fields', emptyFields });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'invalid id' });
  }
  const repo = await Repo.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  if (!repo) {
    return res.status(404).json({ error: 'NO project found' });
  }

  res.status(200).json(repo);
};

module.exports = {
  postRepo,
  getAllRepos,
  getSingleRepo,
  updateRepo,
  deleteRepo,
};
