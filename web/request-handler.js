var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelper = require ('./http-helpers.js');

exports.handleRequest = function (req, res) {
  
  // if (req.method === 'POST') {
  //   //check if request text is in current sites.txt
  //   //if so, render the corresponding html
  //   //if not, go and copy that website
  // console.log(req);
    
  // }
  
  httpHelper.collectData(req);
  httpHelper.serveAssets(res);

  // res.end(archive.paths.list);
};
