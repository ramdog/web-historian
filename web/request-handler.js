var path = require("path");
var archive = require("../helpers/archive-helpers");
var httpHelpers = require("./http-helpers");
var parseUrl = require("url").parse;

var getHTMLPage = function(req, res) {
  // var asset = parseUrl(req.url).pathname;
  httpHelpers.serveAssets(res, "/index.html");
};

var postURL = function(req, res) {
  httpHelpers.collectData(req, function(data) {
    // readListOfUrls()
    archive.readListOfUrls(function(output) {
      var urls = output.toString().split("\n");
      // if !isURLInLIst()
      var url = data.slice(data.indexOf("=") + 1);
      if(!archive.isUrlInList(urls, url)) {
        archive.addUrlToList(url, function(){
          console.log("URL added to sites.txt:", url);
          httpHelpers.serveAssets(res, '/loading.html');
        });
      } else {
        // url is in sites.txt
        archive.downloadedUrls(url, function(files) {
          if (archive.isUrlInList(files, url)) {
            // if it's downloaded
            console.log("in: ", files);
            //TODO: serve .html page to client
          } else {
            // it's not downloaded
            console.log("Page still not downloaded: ", url);
            httpHelpers.serveAssets(res, '/loading.html');
          }
        });
      }
    });
  });
};

exports.handleRequest = function (req, res) {

  var actions = {
    "GET": getHTMLPage,
    "POST": postURL
    // "OPTIONS": 'getOptions'
  };

  var action = actions[req.method];

  if (action) {
    action(req, res);
  } else {
    // todo 404
    // httpHelpers.serveAssets(res, "index.html");
  }

  // res.end(archive.paths.list);
};
