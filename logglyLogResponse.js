/*
Jo Torsmyr
https://github.com/tverilytt/IBMAPIConnect

GatewayScript for sending IBM API Connect response to Loggly.

Assumption:
variable output contains payload.

*/

var myfuncvar = apim.getvariable('myctx.myfunc');
var myfunc = Function(apim.getvariable('myctx.myfunc'));

var myval = myfunc() || 'Eval: ' + eval(apim.getvariable('myctx.myfunc')) || 'myfunc empty';

var logglyCustomerToken = 'your Loggly customer token';

var urlopen = require('urlopen');

var headers = apim.getvariable('message.headers');
headers['transfer-encoding'] = 'chunked';
//apim.setvariable('message.headers.transfer-encoding', 'chunked1');
headers['connection'] = 'keep-alive';
//apim.setvariable('message.headers.connection', 'keep-alive');
apim.setvariable('message.headers', headers);

var message = apim.getvariable('message') || '';

var responseObject = {};
responseObject.statusCode = apim.getvariable('message.status.code');
responseObject.statusReason = apim.getvariable('message.status.reason');
responseObject.headers = apim.getvariable('message.headers');
responseObject.body = apim.getvariable('message.body');

session.output.write(responseObject.body);
apim.output('application/json');

var logData = JSON.stringify({
  myglobal : myval,
  myfuncvar : myfuncvar || 'empty ctx.myfunc',
  type : 'response',
  response : responseObject,
  message : message
});
sendLogData(logData);

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
