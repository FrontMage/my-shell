var initModule = require('modules/initModule');

var store = require('./store'),
  facets = require('./store/facets'),
  actions = require('./actions');

module.exports = initModule({
  data: store,
  facets: facets,
  action: actions,
  namespace: 'defaultModule'
});