/*
Jo Torsmyr
https://github.com/tverilytt/IBMAPIConnect

GatewayScript for general purpose proxy passthrough.

*/

var hosturl = 'http://your.host';

var url = require('url');
var request = apim.getvariable('request');
var search = url.parse(request.uri).search || '';
var targetURL = hosturl + request.path + search;

/* // Bundle request properties into URI, only for debugging...
var requestdata = '';
for (var key in request)
    if (request.hasOwnProperty(key))
       requestdata += key + ':' + request[key];
request.targetURL = targetURL + encodeURIComponent(requestdata);
*/

apim.setvariable('targetURL', targetURL);
