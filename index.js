#!/usr/bin/env node

var program = require('commander');
var mkdirp = require('mkdirp-then');
var fs = require('fs.extra');

var page = require('./page');

program
  .arguments('<templateName> <dirName>')
  .option('-s, --set <path>', 'Set absolute path for templates', saveTemplatePath)
  .option('-p, --page <pageName>', 'Init a page file', page)
  .action(function(templateName, dirName) {
    console.log('initing module %s ...', dirName);
    mkdirp(dirName)
      .then(function() {
        console.log('Module name: %s ...', dirName);
        return Promise.resolve(dirName);
      })
      .then(function(dirName) {
        if (!dirName || dirName.length == 0) {
          console.log('No directory name was given!');
          return;
        }
        fs.readFile(__dirname + '/templatesPath.ms', { encoding: 'utf8' }, function(err, TEMPLATES_PATH) {
          if (err) {
            console.log('Can not find path for templates, try -s templatesPath');
            return;
          }
          console.log('building from template: ' + TEMPLATES_PATH + '/' + templateName);
          copyDir(TEMPLATES_PATH, dirName);
        })
      })
  })
  .parse(process.argv);

function saveTemplatePath(path) {
  fs.writeFileSync(__dirname + '/templatesPath.ms', path, {
    encoding: 'utf8'
  })
  console.log('Template path set to %s', path);
}

function copyDir(originPath, targetPath) {
  console.log('building %s ...', targetPath);

  mkdirp(targetPath)
    .then(function() {
      fs.readdir(originPath, function(err, files) {
        files.forEach(function(pathName) {
          if (pathName.indexOf('.js') == -1) {
            copyDir(originPath + '/' + pathName, targetPath + '/' + pathName);
            return;
          }
          copyFile(originPath + '/' + pathName, targetPath + '/' + pathName);
        });
      });
    })

}

function copyFile(originPath, targetPath) {
  fs.copy(originPath, targetPath, function(err) {
    if (err) {
      console.log('copy %s error', originPath);
      console.log(err);
      return;
    }
    console.log('copy %s done', originPath);
  });
}