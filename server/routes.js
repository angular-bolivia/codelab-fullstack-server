/**
 * This file defines routes for the App.
 */

'use strict';

module.exports = function (app) {
  app.use('/api/users', require('./api/user'));
  app.use('/api/likes', require('./api/like'));
  app.use('/api/comments', require('./api/comment'));
  app.use('/posts', require('./api/publication'));
};
