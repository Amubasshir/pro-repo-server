const express = require('express');
const {
  postRepo,
  getAllRepos,
  getSingleRepo,
  deleteRepo,
  updateRepo,
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
router.delete('/:id', deleteRepo);

// update a new repo
router.patch('/:id', updateRepo);

module.exports = router;
