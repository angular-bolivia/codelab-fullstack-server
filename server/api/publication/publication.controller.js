'use strict';

var jsonfile = require('jsonfile');
var lodash = require('lodash');
var path = require('path');


var DATABASE = path.resolve('db', 'publication.json');

var DB = {};
    DB.likes = path.resolve('db', 'like.json');
    DB.comments = path.resolve('db', 'comment.json');


var MIN_ID = 0;
var MAX_ID = 10000000;

exports.getAllPublications = getAllPublications;
exports.addPublication = addPublication;


function getAllPublications(req, res) {
    console.log('Running getAllPublications');
    var publications;
    jsonfile.readFile(DATABASE, function (err, obj) {
        if (err) {
            res.status(500).send('Internal Server Error');
        }
        publications = obj.publications;
        
        publications.forEach( function(publication) {
            var countLikes = 0
            //var publicationComents = [];
            var resPublications = [];

            jsonfile.readFile(DB.likes, function (errLikes, objLikes) {
                if (errLikes) {
                    errLikes.status(500).send('Internal Server Error');
                }

                objLikes.likes.forEach(function(like) {
                    if(like.OwnerId == publication.Id){
                        countLikes += 1;
                    }
                }, this);

                publication['likes'] = countLikes;

            }, this );

            jsonfile.readFile(DB.comments, function (errComments, objComments) {
                var publicationComents = [];
                if (errComments) {
                    errComments.status(500).send('Internal Server Error');
                }

                objComments.comments.forEach( function(comment) {
                    if(comment.publicationId == publication.id) {
                        publicationComents.push(comment);
                    }
                }, this );
                
                publication['comments'] = publicationComents;
                
            }, this );

        });
        setTimeout(function(){
            res.status(200).json( publications );
        },200,this);
        
      
    });
  }
  


function addPublication(req, res) {
  console.log('Running addLike');
   jsonfile.readFile(DATABASE, function (err, obj) {
     var newPublication = req.body;
     // Generate a random ID
     newPublication.id = getRandomId(MIN_ID, MAX_ID);

     if (err) {
       res.status(500).send('Internal Server Error');
     }

     // Adding into Like array.
     obj.publications.unshift(newPublication);
     
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
  