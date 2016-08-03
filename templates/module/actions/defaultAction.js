module.exports = function(ctrl) {
  ctrl.signal('defaultAction', defaultAction);
};

function defaultAction(ctrl, next, payload) {
  //do something
}