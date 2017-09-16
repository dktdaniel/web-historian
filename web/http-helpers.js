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

  
  fs.readFile(asset, (error, content) => {
    if (error) {
      res.writeHead(500);
      // console.log('error');
      res.end();
    } else {
      res.end(content);
    }
  });
  
};

// exports.sendResponse = function(response, data, statusCode) {
//   statusCode = statusCode || 200;
//   response.writeHead(statusCode, headers);
//   response.end(JSON.stringify(data));
// };
exports.collectData = function(request, response) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    var split = data.split('=')[1];
    archive.isUrlArchived(split, function(boolean) {
      //we do have the site archived/downloaded
      if (boolean === true) {
        //we render the downloaded page
        exports.serveAssets(response, archive.paths.archivedSites + '/' + split);
        
      //we do not have the site archived/downloaded
      } else {
        //serve loading page no matter if the url is on the list or pending    
        fs.readFile(archive.paths.siteAssets + '/loading.html', (error, content) => {
          if (error) {
            console.log('error rendering the loading page');
          } else {
            response.writeHead(302);
            response.end(content);
          }
    
        //download is not on the list yet
        //if it is not on the list then add it
        
          //check if url is in the list
          archive.isUrlInList(split, function(boolean) {
            //if url is not in list
            if (boolean === false) {
              //add url to list
              archive.addUrlToList(split, function(anotherBoolean) {});
            }
          });
        
        //download is pending
        
        });
        
        
        
        
      }
    });
  });
};

// exports.collectData = function(request, response) {
//   var data = '';
//   request.on('data', function(chunk) {
//     data += chunk;
//   });
//   request.on('end', function() {
//     var split = data.split('=')[1];
//     archive.isUrlInList(split, function(boolean) {
//       if (boolean === true) {
//         console.log('URL IS IN LIST! ABOUT TO SERVE PAGE');
//       } else {
        
//         archive.addUrlToList(split, function() {
//           fs.readFile(archive.paths.siteAssets + '/loading.html', (error, content) => {
//             if (error) {
//               console.log('error rendering the loading page');
//             } else {
//               response.writeHead(302);
//               response.end(content);
//             }
//           });
          
//         });
        
        
        
        
//       }
//     });
//   });
// };

// As you progress, keep thinking about what helper functions you can put here!
