// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");           // EasyRTC external module
//var fs = require('fs');
// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.use(express.basicAuth('User', 'EMPLOYEESPROVIDENTFUNDORGANISATION'));
httpApp.use(express.static(__dirname + "/static/"));
//#httpApp.use(express.logger('dev')); //short tiny
httpApp.use(express.logger());
//var logFile = fs.createWriteStream('./myLogFile.log', {flags: 'a'}); //use {flags: 'w'} to open in write mode
//httpApp.use(express.logger({stream: logFile}));
// Start Express http server on port 8080
var webServer = http.createServer(httpApp).listen(8080);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

// Start EasyRTC server
var rtc = easyrtc.listen(httpApp, socketServer);
