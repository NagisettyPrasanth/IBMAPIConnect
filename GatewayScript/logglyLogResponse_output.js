/*
Jo Torsmyr
https://github.com/tverilytt/IBMAPIConnect

GatewayScript for sending IBM API Connect response to Loggly.

Assumption:
variable output contains payload.

*/

var logglyCustomerToken = 'your Loggly customer token';

var urlopen = require('urlopen');
var responseObject = {};
responseObject.statusCode = apim.getvariable('message.status.code');
responseObject.statusReason = apim.getvariable('message.status.reason');
responseObject.headers = apim.getvariable('message.headers');
responseObject.body = apim.getvariable('message.body');

var payload = apim.getvariable('output.body');

responseObject.payload = payload;
var logData = JSON.stringify(responseObject);
sendLogData(logData);

session.output.write(payload);
apim.output('application/json');

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
