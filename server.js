require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const repoRoutes = require('./routes/repoRoute');

// app
const app = express();

// port
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/repos', repoRoutes);

// mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(port, () => {
      console.log(`connected to mongodb and listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
