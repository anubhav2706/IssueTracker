const express = require('express');
const app = express();

// Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/issue-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Set up routes
const projectController = require('./controllers/projectController');
const issueController = require('./controllers/issueController');

app.use('/', projectController);
app.use('/issues', issueController);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
