'use strict';

var jsonfile = require('jsonfile');
var lodash = require('lodash');
var path = require('path');

var DATABASE = path.resolve('db', 'user.json');
var MIN_ID = 0;
var MAX_ID = 10000000;

exports.getUsers = getUsers;
exports.addUser = addUser;
exports.deleteUser = deleteUser;

function getUsers(req, res) {
  console.log('Running getUsers');
  jsonfile.readFile(DATABASE, function (err, obj) {
    if (err) {
      res.status(500).send('Internal Server Error');
    }
    res.status(200).json(obj.users);
  });
}

function addUser(req, res) {
  console.log('Running addUser');
  jsonfile.readFile(DATABASE, function (err, obj) {
    var newUser = req.body;
    // Generate a random ID
    newUser.id = getRandomId(MIN_ID, MAX_ID);

    if (err) {
      res.status(500).send('Internal Server Error');
    }

    // Adding into users array.
    obj.users.unshift(newUser);

    jsonfile.writeFile(DATABASE, obj, function (errorWrite) {
      if (errorWrite) {
        res.status(500).send('Internal Server Error');
      }
      res.status(200).json(newUser);
    });
  });
}

function deleteUser(req, res) {
  console.log('Running deleteUser');
}

function getRandomId(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
