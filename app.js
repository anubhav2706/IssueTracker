const express = require('express');
const app = express();

// Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Cluster81784:anubhav1011@cluster81784.cue1vgb.mongodb.net/issue-tracker?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error in connecting to db'));

db.once('open', function(){
  console.log("successfully connected");
})


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
