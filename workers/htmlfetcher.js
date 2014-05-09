// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var archive = require("../helpers/archive-helpers");
var fs = require("fs");
var _ = require("underscore");

var htmlfetcher = function() {
  // get list of site in site.txt
  archive.readListOfUrls(function(output) {
    var siteUrls = output.toString().split("\n").slice(0,-1); //remove last item which will be a newline
    // get list of downloaded sites in sites/ dir
    archive.downloadedUrls(function(downloadedSites) {
      // compare the two
      var sitesToDownload = _.difference(siteUrls, downloadedSites);
      _.each(sitesToDownload, function(urlToDownload) {
        archive.downloadUrls(urlToDownload, function(){
          console.log("finished downloading");
        });
      });
    });
  });

};

htmlfetcher();

// archive.downloadUrls("www.cnn.com", function() {
//   console.log("finished downloading");
// });
