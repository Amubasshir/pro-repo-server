const express = require('express');
const {
  postRepo,
  getAllRepos,
  getSingleRepo,
  deleteRepo,
  updateRepo,
} = require('../controllers/repoController');

const requireAuth = require('../middlewares/requireAuth');

// router
const router = express.Router();

router.use(requireAuth);

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
