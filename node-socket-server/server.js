var sys = require("sys")
  , ws = require('./node-websocket-server/lib/ws');

var server = ws.createServer();
var stdin = process.openStdin();
stdin.setEncoding('utf8');

server.addListener("listening", function(){
  sys.log("Listening for connections.");
});

// Handle WebSocket Requests
server.addListener("connection", function(conn){
  conn.send("Connection established!");

  stdin.on('data', function (chunk) {
    conn.send(chunk);
  });
});

server.addListener("close", function(conn){
  server.broadcast("<"+conn.id+"> disconnected");
});

server.listen(8008);
