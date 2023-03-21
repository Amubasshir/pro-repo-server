require('dotenv').config();

const express = require('express');
const repoRoutes = require('./routes/repoRoute');

// app
const app = express();

// port
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/repos', repoRoutes);

// listen for request
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
