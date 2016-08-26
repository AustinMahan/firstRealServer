'use strict';

var fs = require('fs');
var path = require('path');
var guestpath = path.join(__dirname, 'guest.json');

var http = require('http');
var port = process.env.PORT || 8000;

var server = http.createServer(function (req, res) {
  if (req.method == 'GET' && req.url == '/guest' || req.url == '/guest/') {
    fs.readFile(guestpath, 'utf8', function (err, data) {
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    });
  } else if (req.method == 'GET' && req.url.length > '/guest'.length + 1) {
    fs.readFile(guestpath, 'utf8', function (err, data) {
      if (err) {
        throw err;
      }

      // console.log(data);
      var guests = JSON.parse(data);
      var guest = parseInt(req.url.substr(req.url.indexOf('/guest') + '/guest'.length + 1));
      res.setHeader('Content-Type', 'application/json');
      res.end(guests[guest]);
    });

  } else if (req.method == 'POST') {
    console.log(req);
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hit');
    // fs.writeFile(guestpath, 'postData', function(err){
    //   if (err) {
    //     throw err;
    //   }
    // })
  }else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
