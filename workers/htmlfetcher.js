// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');




var CronJob = require('cron').CronJob;
var task = new CronJob('*/1 * * * *', function() {
  console.log('running a task every minute');
  
  archive.readListOfUrls(archive.downloadUrls);
  
}, null, true);

task.start();