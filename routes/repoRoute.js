const express = require('express');

// router
const router = express.Router();

// get all repos
router.get('/', (req, res) => {
  res.json({ message: 'get all repos' });
});

// get a single repo
router.get('/:id', (req, res) => {
  res.json({ message: 'get a single repo' });
});

// post a new repo
router.post('/', (req, res) => {
  res.json({ message: 'post a new repo' });
});

// delete a repo
router.delete('/:id', (req, res) => {
  res.json({ message: 'delete a repo' });
});

// update a new repo
router.patch('/:id', (req, res) => {
  res.json({ message: 'patch a new repo' });
});

module.exports = router;
