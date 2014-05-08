var path = require("path");
var archive = require("../helpers/archive-helpers");
var httpHelpers = require("./http-helpers");
var parseUrl = require("url").parse;

var getHTMLPage = function(req, res) {
  var asset = parseUrl(req.url).pathname;
  httpHelpers.serveAssets(res, asset);
};

var postURL = function(req, res) {

};

exports.handleRequest = function (req, res) {

  var actions = {
    "GET": getHTMLPage,
    "POST": postURL,
    "OPTIONS": 'getOptions'
  };

  var action = actions[req.method];

  if (!action) {
    // todo 404
  } else {
    action(req, res);
    // httpHelpers.serveAssets(res, "index.html");
  }

  // res.end(archive.paths.list);
};
