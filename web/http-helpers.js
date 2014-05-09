var path = require("path");
var fs = require("fs");
var archive = require("../helpers/archive-helpers");

exports.headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
  // "Content-Type": "text/html"
};

exports.collectData = function(req, callback) {
  var data = "";
  req.on("data", function(partial){
    data += partial;
  });
  req.on("end", function(){
    callback(data);
  });
};

exports.sendResponse = function(res, data, status){
  status = status || 200;
  res.writeHead(status, exports.headers);
  res.end(data);
};

exports.send404 = function(res){
  exports.sendResponse(res, "Not Found", 404);
};

exports.sendRedirect = function(res, url) {
  res.writeHead(302, {Location: url});
  res.end();
};

exports.serveAssets = function (res, asset, callback) {
  var encoding = {encoding: "utf8"};
  fs.readFile(archive.paths.siteAssets + asset, encoding, function (err, data) {
    if(err) {
      //didn’t exist in public folder
      fs.readFile(archive.paths.archivedSites + asset, encoding, function (err, data) {
        if (err) {
          //file doesn't exist in archive
          callback ? callback() : exports.send404(res);
        } else {
          exports.sendResponse(res, data);
        }
      });
    } else {
      exports.sendResponse(res, data);
    }
  });
};

