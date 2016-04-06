/*
Jo Torsmyr
https://github.com/tverilytt/IBMAPIConnect

GatewayScript for sending IBM API Connect requests to Loggly.

*/

var logglyCustomerToken = 'your Loggly customer token';

var urlopen = require ('urlopen');
var request = apim.getvariable('request');

var payload;

session.INPUT.readAsBuffer(function(error, buffer) {
  if (error) payload = '';
  else 
    if (buffer.length > 0) payload = buffer.toString();
    else payload = '';

  var logData = JSON.stringify(request) + payload;
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
