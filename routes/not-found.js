'use strict';

module.exports = function(request, reply) {
  return reply('Page not found.').code(404);
};
