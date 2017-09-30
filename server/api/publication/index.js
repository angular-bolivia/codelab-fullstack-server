'use strict';

var express = require('express');
var controller = require('./publication.controller');

var router = express.Router();

router.get('/', controller.getAllPublications);
router.post('/', controller.addPublication);

module.exports = router;
     