'use strict';

var jsonfile = require('jsonfile');
var lodash = require('lodash');
var path = require('path');

var DATABASE = path.resolve('db', 'like.json');
var MIN_ID = 0;
var MAX_ID = 10000000;

exports.addLike = addLike;
exports.getLikes = getLikes;


function getLikes(req, res) {
    console.log('Running getLikes');
    jsonfile.readFile(DATABASE, function (err, obj) {
      if (err) {
        res.status(500).send('Internal Server Error');
      }
      res.status(200).json( obj.likes );
    });
  }
  


function addLike(req, res) {
  console.log('Running addLike');
   jsonfile.readFile(DATABASE, function (err, obj) {
     var newLike = req.body;
     console.log('newLike',newLike);
     // Generate a random ID
     newLike.id = getRandomId(MIN_ID, MAX_ID);

     if (err) {
       res.status(500).send('Internal Server Error');
     }

     // Adding into Like array.
     obj.likes.unshift(newLike);
     
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
  