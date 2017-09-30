'use strict';

var express = require('express');
var controller = require('./like.controller');

var router = express.Router();

router.get('/', controller.getLikes);
router.post('/', controller.addLike);

module.exports = router;
