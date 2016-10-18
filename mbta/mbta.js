var map;
var parsedData;
var myLocation, map;
var stationMarkers;

// Making the different stops into objects
 var southStation = {stop_name: "South Station", stop_lat: 42.352271, stop_long: -71.05524200000001};
 var andrew = {stop_name: "Andrew", stop_lat: 42.330154, stop_long: -71.057655};
 var porterSquare = {stop_name: "Porter Square", stop_lat: 42.3884, stop_long: -71.11914899999999};
 var harvardSquare = {stop_name: "Harvard Square", stop_lat: 42.373362, stop_long: -71.118956};
 var jfk = {stop_name: "JFK/UMASS", stop_lat: 42.320685, stop_long: -71.052391};
 var savinHill = {stop_name: "Savin Hill", stop_lat: 42.31129, stop_long: -71.053331};
 var parkStreet = {stop_name: "Park Street", stop_lat: 42.35639457, stop_long: -71.0624242};
 var broadway = {stop_name: "Broadway", stop_lat: 42.342622, stop_long: -71.056967};
 var northQuincy = {stop_name: "North Quincy", stop_lat: 42.275275, stop_long: -71.029583};
 var shawmut = {stop_name: "Shawmut", stop_lat: 42.29312583, stop_long: -71.06573796000001};
 var davis = {stop_name: "Davis Square", stop_lat: 42.39674, stop_long: -71.121815};
 var alewife = {stop_name: "Alewife", stop_lat: 42.395428, stop_long: -71.142483};
 var mit = {stop_name: "Kendall/MIT", stop_lat: 42.36249079, stop_long: -71.08617653};
 var mgh = {stop_name: "Charles/MGH", stop_lat: 42.361166, stop_long: -71.070628};
 var crossing = {stop_name: "Downtown Crossing", stop_lat: 42.355518, stop_long: -71.060225};
 var quincyCenter = {stop_name: "Quincy Center", stop_lat: 42.251809, stop_long: -71.005409};
 var quincyAdams = {stop_name: "Quincy Adams", stop_lat: 42.233391, stop_long: -71.007153};
 var ashmont = {stop_name: "Ashmont", stop_lat: 42.284652, stop_long: -71.06448899999999};
 var wollaston = {stop_name: "Wollaston", stop_lat: 42.2665139, stop_long: -71.0203369};
 var fields = {stop_name: "Fields Corner", stop_lat: 42.300093, stop_long: -71.061667};
 var central = {stop_name: "Central Square", stop_lat: 42.365486, stop_long: -71.103802};
 var braintree = {stop_name: "Braintree", stop_lat: 42.2078543, stop_long: -71.0011385};

//Map Initiation
function initMap(){
	 myLocation = new google.maps.LatLng(45,-75);
	 MapSettings = {
		center: myLocation,
		zoom: 12,
	};
	map = new google.maps.Map(document.getElementById('map'), MapSettings);
	map.panTo(myLocation);

  userlocation();
}

// Finding my location on the map
function userlocation(){
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			userLat = position.coords.latitude;
			userLong = position.coords.longitude;
			getMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser. What a shame!");
	}
}

//Center map on my location
function getMap(){
	userlocation = new google.maps.LatLng(userLat, userLong);
	map.panTo(userlocation);

	userMarker = markerMaker(userlocation, "You are here",{url: "you_are_here.png"})
}

//Marker for my location
function markerMaker(markerposition, markertitle, markericon){
	let marker = new google.maps.Marker({
		position: markerposition,
		title: markertitle,
		icon: markericon,
	});

  marker.setMap(map);

	//Info windows
var infowindow = new google.maps.InfoWindow();

google.maps.event.addListener(marker, 'click', function(){
	infowindow.setContent(marker.title);
	infowindow.open(map, marker);
});

return marker;
}

//
//
//
//
// //Get JSON data into my map
// 	function loadStopTimes(){
//
// 	request = new XMLHttpRequest();
// 	request.open("get", "https://rocky-taiga-26352.herokuapp.com/redline.json", true);
// 	request.onreadystatechange = funex;
// 	request.send();
// }
//
//
//
// function funex(){
// 	console.log("called funex" + request.readyState);
// 	if (request.readyState == 4 && request.status == 200){
// 		theData=request.responseText;
// 		funex = JSON.parse(theData);
// 		newHTML = "";
// 		section = document.getElementById("map");
//
// 	}
// }

// map = new google.maps.Map(document.getElementById('map'), {
//   center: {lat: -34.397, lng: 150.644},
//   zoom: 12
// });
