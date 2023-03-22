const express = require('express');
const {
  postRepo,
  getAllRepos,
  getSingleRepo,
} = require('../controllers/repoController');

// router
const router = express.Router();

// get all repos
router.get('/', getAllRepos);

// get a single repo
router.get('/:id', getSingleRepo);

// post a new repo
router.post('/', postRepo);

// delete a repo
router.delete('/:id', (req, res) => {
  res.json({ message: 'delete a repo' });
});

// update a new repo
router.patch('/:id', (req, res) => {
  res.json({ message: 'patch a new repo' });
});

module.exports = router;
