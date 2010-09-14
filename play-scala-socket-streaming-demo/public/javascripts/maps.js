var map;
function initializeMap() {

	var latlng = new google.maps.LatLng(37.770, -42.455);
   	var myOptions = {
        zoom: 2,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById("map"), myOptions);

}

function addTweetMarker(name, content, latlng) {
	var marker = new google.maps.Marker({
      position: latlng,
      title: "@"+name
  	});

	var html = createContent(name,content);
	var infowindow = new google.maps.InfoWindow({
    	content: html
	});

	infowindow.open(map,marker);
  	map.setZoom(8);
  	// To add the marker to the map, call setMap();
  	marker.setMap(map)
}

function createContent(name, content) {
	var html = '<img src="http://img.tweetimag.es/i/' + name + '_n.png" style="width:70px; float:left; margin-top: 20px"/>'
	html += '<div style="margin-left:10px;float: right"><p><strong>'+name+'</strong></p>';
	html += '<p style="width: 200px">'+content+'</p></div>';
	return html;
}

function getFormattedLocation() {
    if (google.loader.ClientLocation.address.country_code == "US" &&
    google.loader.ClientLocation.address.region) {
        return google.loader.ClientLocation.address.city + ", "
        + google.loader.ClientLocation.address.region.toUpperCase();
    } else {
        return google.loader.ClientLocation.address.city + ", "
        + google.loader.ClientLocation.address.country_code;
    }
}