'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.getUsers);
router.post('/', controller.addUser);
router.delete('/:index', controller.deleteUser);

module.exports = router;
