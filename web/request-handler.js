var path = require("path");
var archive = require("../helpers/archive-helpers");
var httpHelpers = require("./http-helpers");
var parseUrl = require("url").parse;

var handlePOST = function(req, res) {
  httpHelpers.collectData(req, function(data) {
    // get the post data from user
    var url = data.slice(data.indexOf("=") + 1);
    archive.readListOfUrls(function(output) {
      // check list of urls in sites.txt
      var urls = output.toString().split("\n");
      if(!archive.isUrlInList(urls, url)) {
        archive.addUrlToList(url, function(){
          console.log("URL added to sites.txt:", url);
          httpHelpers.sendRedirect(res, '/loading.html');
        });
      } else {
        // url is in sites.txt
        archive.downloadedUrls(function(files) {
          if (archive.isUrlInList(files, url)) {
            // if it's downloaded
            httpHelpers.sendRedirect(res, "/"+url);
          } else {
            // it's not downloaded
            console.log("Page still not downloaded: ", url);
            httpHelpers.sendRedirect(res, '/loading.html');
          }
        });
      }
    });
  });
};

var getSite = function(req, res) {
  var urlPath = parseUrl(req.url).pathname;
  if (urlPath === "/") {
    urlPath = "/index.html";
  }
  httpHelpers.serveAssets(res, urlPath);
};


exports.handleRequest = function (req, res) {
  var actions = {
    "GET": getSite,
    "POST": handlePOST
  };
  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    httpHelpers.send404(res);
  }
};
