var fs = require('fs.extra');
var co = require('co');
var prompt = require('co-prompt');

module.exports = function(pageName) {
  return co(function*() {
    var pageTemplate = fs.readFileSync(__dirname + '/defaultTemplates/pageTemplate.tp').toString();
    var name = yield prompt('name: ');
    var title = yield prompt('title: ');
    pageTemplate = pageTemplate.replace('{{{name}}}', name);
    pageTemplate = pageTemplate.replace('{{{title}}}', title);
    fs.writeFileSync(process.env.PWD + '/' + pageName + '.js', pageTemplate, {
      encoding: 'utf8'
    });
    process.stdin.pause();
  });
};