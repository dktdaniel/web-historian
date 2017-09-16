var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  var arrayOfUrls = [];
  fs.readFile(exports.paths.list, 'utf8', (error, content) => {
    if (error) {
      console.log('error reading list');
      res.end();
    } else {
      arrayOfUrls = content.split('\n');
      // console.log('console log of array of urls', arrayOfUrls);
      callback(arrayOfUrls);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(arrayOfUrls) {
    if (arrayOfUrls.includes(url)) {
      
      callback(true);
    } else {
      // console.log('url', url, arrayOfUrls.includes(url));
      callback(false);
    }
  });
  
  //var currentArray = readListOfUrls(callback);
  //is yes
    //isUrlArchived
  //if no
    //addUrlToList
    //serve loading page
  
};

exports.addUrlToList = function(url, callback) {
  //callback = downloadUrls
  // invoke isurlinlist  and if ig the value is false then add it to the list
  exports.isUrlInList(url, function(boolean) {
    if (boolean === false) {
      fs.appendFile(exports.paths.list, url + '\n', (error) => {
        if (error) {
          console.log('error reading list');
        }
        callback(true);
      });
    }
  });
};

exports.isUrlArchived = function(url, callback) {

  //if yes
    //serve the page
  //if no
    //downloadUrls
    
  // console.log('ISURLARCHIVED', exports.paths.archivedSites + url);
  if (fs.existsSync(exports.paths.archivedSites + '/' + url)) {
    callback(true);
  } else {
    callback(false);
  }
};

exports.downloadUrls = function(urls) {
  //call htmlfetcher
  urls.forEach(function(singleUrl) {
    exports.isUrlArchived(singleUrl, function(boolean) {
      if (boolean === false) {
        // if the file doesn't exist, create it.
        if (!fs.existsSync(exports.paths.archivedSites + '/' + singleUrl)) {
          // We use fs.openSync to create the file
          var path = fs.openSync(exports.paths.archivedSites + '/' + singleUrl, 'w');
          fs.closeSync(path);
        }
        var file = fs.createWriteStream(exports.paths.archivedSites + '/' + singleUrl);
        // console.log('FILE: ', file);
        var request = http.get('http://' + singleUrl, function(response) {
          response.pipe(file);
        });
      }
    });
  });
};
