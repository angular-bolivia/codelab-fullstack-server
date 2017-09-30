'use strict';

var express = require('express');
var controller = require('./comment.controller');

var router = express.Router();

router.get('/', controller.getComments);
router.post('/', controller.addComment);

module.exports = router;
     