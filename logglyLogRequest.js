/*
Jo Torsmyr
https://github.com/tverilytt/IBMAPIConnect

GatewayScript for sending IBM API Connect requests to Loggly.

*/

function myfunc() { return 'joglobal'};
apim.setvariable('myctx.myfunc', myfunc.toString());

var logglyCustomerToken = 'your Loggly customer token';

var headers = apim.getvariable('message.headers');
headers['accept-language'] = '*';
apim.setvariable('message.headers', headers);
//apim.setvariable('message.headers.accept-language', '');

var urlopen = require('urlopen');
var request = apim.getvariable('request');
var message = apim.getvariable('message');
var payload;

var keys = [];
keys.push('dummy');
var myself = apim;
var key;
for (key in myself) {
//  if (myself.hasOwnProperty(key)) {
     keys.push(key);
//  }
}
for (key in myself.util) {
//  if (myself.hasOwnProperty(key)) {
     keys.push(key);
//  }
}
var service = apim.getvariable('service') || 'empty service';

session.INPUT.readAsBuffer(function(error, buffer) {
  if (error) payload = '';
  else {
    if (buffer.length > 0) payload = buffer.toString();
    else payload = '';
  }

//  var rh = '<<' + apim.getvariable('request.headers.content-type') + '>>';
//  rh += '<<' + apim.getvariable('request').headers['content-type'] + '>>';
    
  payload = payload || 'empty payload';
  var logData = JSON.stringify({
    type : 'request',
    service : service,
    apimkeys : keys,
    request : request,
    message : message,
    payload : payload,
    myfunc : myfunc.toString() || 'empty func'
  });
  sendLogData(logData);
});

function sendLogData(data) {
  var options = {
    target : 'http://logs-01.loggly.com/inputs/' + logglyCustomerToken + '/tag/https',
    method : 'POST',
    contentType : 'application/json',
    data : data
  };

  urlopen.open(options, function(error, response) {
    if (error) throw error;
  });
}
