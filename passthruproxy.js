/*
Jo Torsmyr
https://github.com/tverilytt/IBMAPIConnect

GatewayScript for general purpose proxy passthrough.

*/


var url = require('url');
var request = apim.getvariable('request');
var search = url.parse(request.uri).search || '';

var headers = request.headers;

var host = headers['x-jo2-host'] || 'sljo2.mybluemix.net';
var port = headers['x-jo2-port'] || 443;

//var hosturl = 'https://sljo2.mybluemix.net';
var hosturl = 'https://' + host + ':' + port;

var targetURL = hosturl + request.path + search;

/* // Bundle request properties into URI, only for debugging...
var requestdata = '';
for (var key in request)
    if (request.hasOwnProperty(key))
       requestdata += key + ':' + request[key];
request.targetURL = targetURL + encodeURIComponent(requestdata);
*/

apim.setvariable('targetURL', targetURL);
