var express = require('express');
var useragent = require('useragent');

var app = express();

app.set('port', process.env.PORT);

app.get('/', function(req, res) {
  
  var visitor = useragent.parse(req.headers['user-agent']);
 
  var visitorIP = req.headers["x-forwarded-for"];
  
  if (visitorIP) {
    var IPlist = visitorIP.split(",");
    visitorIP = IPlist[IPlist.length -1];
  } else {
    visitorIP = req.connection.remoteAddress;
  }
  
  res.json({
    "IP-Address": visitorIP,
    "Language": req.headers['accept-language'].split(',')[0],
    "Operating System": visitor.os.family
  });
  
});

app.listen(app.get('port'), function() {
  console.log('Node.js Server is listening on port ' + app.get('port'));
  });