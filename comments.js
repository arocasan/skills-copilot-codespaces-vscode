// Create web server
// Load modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./models/comment');

// Connect to database
mongoose.connect('mongodb://localhost/comments');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Create express app
var app = express();

// Configure app to use bodyParser to parse json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set port
var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// Create router
var router = express.Router();

// Middleware to use for all requests
router.use(function(req, res, next) {
    // Do logging
    console.log('Something is happening.');
    next(); // Make sure we go to the next routes and don't stop here
});

// Test route to make sure everything is working
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// Create a comment
router.route('/comments')

    // Create a comment (accessed at POST http://localhost:8080/api/comments)
    .post(function(req, res) {

        var comment = new Comment(); // Create a new instance of the Comment model
        comment.name = req.body.name; // Set the comment name (from the request)
        comment.text = req.body.text; // Set the comment text (from the request)

        // Save the comment and check for errors
        comment.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Comment created!' });
        });

    })

    // Get all the comments (accessed at GET http://localhost:8080/api/comments)
    .get(function(req, res) {
        Comment.find(function(err, comments) {
            if (err)
                res.send(err);

            res.json(comments);
        });
    });

// Get the comment with that id (accessed at GET http://localhost:8080/api/comments/:comment_id)
router.route('/comments/:comment_id')

    // Get the comment with that id (accessed at GET http://localhost:8080/api/comments/:comment_id)
    .get(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err)