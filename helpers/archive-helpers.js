var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(paths['list'], function(err, output) {
    if (err) {
      console.log("Error reading file");
    } else {
      callback(output);
    }
  });
};

exports.isUrlInList = function(urls, url){
  return urls.indexOf(url) !== -1;
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(paths['list'], url+"\n", function(err) {
    if(err) {
      console.log("Error reading file");
    } else {
      callback();
    }
  });
};

exports.isUrlArchived = function(urls, url){
};

exports.downloadedUrls = function(url, callback){
  fs.readdir(paths['archivedSites'], function(err, files) {
    if(err) {
      console.log("Error reading file");
    } else {
      callback(files);
    }
  });
};

exports.downloadUrls = function() {

};

