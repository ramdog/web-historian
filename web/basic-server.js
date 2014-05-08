var http = require("http");
var handler = require("./request-handler");
var parseUrl = require("url").parse;

var port = 8080;
var ip = "127.0.0.1";

// make routes a function
var routes = {
  "/": handler.handleRequest
};

var server = http.createServer(function(request, response) {
  var url = parseUrl(request.url);
  var route = routes[url.pathname];
  if(route) {
    route(request, response);
  }
  else {
    //implement 404
  }
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

