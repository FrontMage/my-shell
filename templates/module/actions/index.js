var defaultAction = require('./defaultAction');

module.exports = function(ctrl) {
  [defaultAction].forEach(function(watch) {
    watch(ctrl);
  });
};