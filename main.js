var net = require('net');
var SQL = require('./SQLfunction.js');

var server = net.createServer();  
server.on('connection', handleConnection);

server.listen(2000, function() {  
  console.log('server listening to %j', server.address());
});


function handleConnection(conn) {  
  var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
  console.log('new client connection from %s', remoteAddress);

  conn.on('data', onConnData);
  conn.once('close', onConnClose);
  conn.on('error', onConnError);

  function onConnData(d) {
    console.log('connection data from %s: %j', remoteAddress, d);
    var data = d.toString('utf8');
    var data = JSON.parse(data);

    if (data.type == "id")
    {
      SQL.getByID(data.value,function(err,result){
        result = JSON.stringify(result);
        result = Buffer.from( result , 'utf8' );
        conn.write(result);
      });
    }

    else if (data.type == "email")
    {
      SQL.getByEmail(data.value,function(err,result){
        result = JSON.stringify(result);
        result = Buffer.from( result , 'utf8' );
        conn.write(result);
      });
    }

    else {
      result = "error";
      result = Buffer.from( result , 'utf8' );      
      conn.write(result);

    }
  }

  function onConnClose() {
    console.log('connection from %s closed', remoteAddress);
  }

  function onConnError(err) {
    console.log('Connection %s error: %s', remoteAddress, err.message);
  }
}