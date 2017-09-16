var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');
var urlParser = require('url');
var helpers = require('./http-helpers.js');
var archHelpers = require ('../helpers/archive-helpers.js');
// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

var port = 8080;
var ip = '127.0.0.1';

// var routes = {
  
// };

// var server = http.createServer( (request, response) => {
//   // var parts = urlParser.parse(request.url);
//   // console.log('PARTS BEGIN', parts);
//   // console.log(request);
//   helpers.collectData(request);
//   archHelpers.readListOfUrls();
//   handler.handleRequest(request, response);
  
// });

var server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}

