var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  
  fs.readFile(archive.paths.siteAssets + '/index.html', (error, content) => {
    if (error) {
      res.writeHead(500);
      // console.log('error');
      res.end();
    } else {
      res.end(content);
    }
  });
  
};

exports.sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    var split = data.split('=')[1];
    console.log(split);
    // console.log(JSON.stringify(split));
    // console.log(JSON.stringify(data));
    
    //callback = isUrlInList
    // callback(data);
  });
};



// As you progress, keep thinking about what helper functions you can put here!
