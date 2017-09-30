'use strict';

var jsonfile = require('jsonfile');
var lodash = require('lodash');
var path = require('path');

var DATABASE = path.resolve('db', 'comment.json');
var MIN_ID = 0;
var MAX_ID = 10000000;

exports.addComment = addComment;
exports.getComments = getComments;


function getComments(req, res) {
    console.log('Running getComments');
    jsonfile.readFile(DATABASE, function (err, obj) {
      if (err) {
        res.status(500).send('Internal Server Error');
      }
      res.status(200).json( obj.comments );
    });
  }
  


function addComment(req, res) {
  console.log('Running addComment');
   jsonfile.readFile(DATABASE, function (err, obj) {
     var newComment = req.body;
     console.log('newComment',newComment);
     // Generate a random ID
     newComment.id = getRandomId(MIN_ID, MAX_ID);

     if (err) {
       res.status(500).send('Internal Server Error');
     }

     // Adding into Like array.
     obj.comments.unshift(newComment);
     
     jsonfile.writeFile(DATABASE, obj,{spaces: 2, EOL: '\r\n'}, function (errorWrite) {
       if (errorWrite) {
         res.status(500).send('Internal Server Error');
       }
       res.status(200).json(newUser);
     });
   });
}


function getRandomId(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}