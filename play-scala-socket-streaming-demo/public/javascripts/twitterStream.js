var socket;

function addMarkerToMap(event) {
	var name = jQuery.parseJSON(event.data)['screen_name'];
	var tweet = jQuery.parseJSON(event.data)['text'];
	var coordinates = jQuery.parseJSON(event.data)['coordinates'];
	addTweetMarker(name, tweet, new google.maps.LatLng(coordinates[0]))
}

if (window.WebSocket) {
  if (socket == null) socket = new WebSocket("ws://localhost:8888/websocket");
  socket.onmessage = function(event) {
	var tweet = jQuery.parseJSON(event.data);
	if (tweet.geo && tweet.user.screen_name && tweet.text) {		
		var name = tweet.user.screen_name;
		var content = tweet.text;
		addTweetMarker(name, content, new google.maps.LatLng(parseFloat(tweet.geo.coordinates[0]),parseFloat(tweet.geo.coordinates[1])));
	}
  };
  socket.onopen = function(event) {
	$("#socketStatus").val("Web Socket open."); 
  };
  socket.onclose = function(event) {
	$("#socketStatus").val("Web Socket closed."); 
  };
} else {
  alert("Your browser does not support Web Socket.");
}
 
function startStream() {
  if (!window.WebSocket) { return; }
  if (socket.readyState == WebSocket.OPEN) {
    socket.send("start");
  } else {
    alert("The socket is not open.");
  }
}

