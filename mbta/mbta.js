var map;
var parsedData;
var userLocation, map;
var stationMarkers;
var stations;


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

//Stations Array
stations= [southStation, andrew, porterSquare, harvardSquare, jfk, savinHill, parkStreet, broadway,
 northQuincy, shawmut, davis, alewife, mit, mgh, crossing, quincyCenter, quincyAdams, ashmont, wollaston,
 fields, central, braintree];


//Map Initiation
function initMap(){
	 userLocation = new google.maps.LatLng(45,-75);
	 MapSettings = {
		center: userLocation,
		zoom: 12,
	};
	map = new google.maps.Map(document.getElementById('map'), MapSettings);
	map.panTo(userLocation);

  request = new XMLHttpRequest();
  request.open("get", "https://rocky-taiga-26352.herokuapp.com/redline.json", true);
  request.onreadystatechange = funex;
  request.send();

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

	userMarker = markerMaker(userlocation, "You are here",{url: "you_are_here.png", scaledSize: new google.maps.Size(50,50)},false);

  getStationsOnMap();
}

//Marker for my location
function markerMaker(markerposition, markertitle, markericon, isStop = true){
	let marker = new google.maps.Marker({
		position: markerposition,
		title: markertitle,
		icon: markericon,
	});
//Adds info windows to the stops
  let infowindow = new google.maps.InfoWindow();
  google.maps.event.addListener(marker, 'click', function(){
    let stationInfo = "<h1>" + markertitle + ":" + "</h1>";
    if(isStop){
      loadStopTimes();
      markerContent = getPredictions(marker.title);
      stationInfo += markerContent;
    }else{
      stationInfo += "<div> Closest Stop: " + closestStation.stop_name + " "+ closestDist.toFixed(2) + " miles away</div>";
    }
    infowindow.setContent(stationInfo);
    infowindow.open(map, marker);
  });
  marker.setMap(map);
  return marker;
}

//Getting T-Stops on the map
function getStationsOnMap(){
  let stationIcon = {
	  url: "station_icon.png",
	  scaledSize: new google.maps.Size(30,30),
  }

  stations.forEach(function(station) {
	  let stopLocation = new google.maps.LatLng(station.stop_lat, station.stop_long);
	  let stationMarker = markerMaker(stopLocation, station.stop_name,stationIcon);
    stationMarker.setMap(map);
  });

  addPolylines();
}

// //Next train schedule
function getPredictions(stopName){
  let stationString = "";

	trainSchedule.TripList.Trips.forEach(function(train){
		train.Predictions.forEach(function(predictTime){
      if(predictTime.Stop == stopName){
        stationString += "<div>Destination: "+
        train.Destination +" Next Train (seconds): " + predictTime.Seconds +"</div>";
      }
    });
	});
	return stationString;
}


//Train Station Polylines
function stationCoords(){
  straightCoords = [];
  splitRightCoords = [];
  splitLeftCoords = [];

  straight = [alewife, davis, porterSquare, harvardSquare, central, mit, mgh, parkStreet, crossing, southStation, broadway, andrew, jfk];
  splitRight = [jfk, northQuincy, wollaston, quincyCenter, quincyAdams, braintree];
  splitLeft = [jfk, savinHill,  fields, shawmut, ashmont];


  straight.forEach(function(station) {
    let mapCoord = {lat: station.stop_lat , lng: station.stop_long};
    straightCoords.push(mapCoord);
  })
  splitRight.forEach(function(station) {
    let mapCoord = {lat: station.stop_lat , lng: station.stop_long};
    splitRightCoords.push(mapCoord);
  })
  splitLeft.forEach(function(station) {
    let mapCoord = {lat: station.stop_lat , lng: station.stop_long};
    splitLeftCoords.push(mapCoord);
  })
}


function addPolylines(){
  stationCoords();

	straightPoly = new google.maps.Polyline({
		path: straightCoords,
		strokeColor: '#ff0000',
		strokeOpacity: 1.0,
		strokeWeight: 3.75,
	  });

	straightPoly.setMap(map);

  splitRightPoly = new google.maps.Polyline({
    path: splitRightCoords,
    strokeColor: '#ff0000',
    strokeOpacity: 1.0,
    strokeWeight: 3.75,
    });

  splitRightPoly.setMap(map);

  splitLeftPoly = new google.maps.Polyline({
    path: splitLeftCoords,
    strokeColor: '#ff0000',
    strokeOpacity: 1.0,
    strokeWeight: 3.75,
    });

  splitLeftPoly.setMap(map);

  findNearest();
}

function findNearest(){
	userCoords = [userLat, userLong];
	stations.forEach(function(station,index){
		let stationCoords = [station.stop_lat, station.stop_long];
		let stationDist = haversineDistance(stationCoords, userCoords, true);
		if (index == 0){
		    closestDist = stationDist;
        closestStation = station;
		}
		if (stationDist < closestDist){
			closestDist = stationDist;
			closestStation = station;
		}
	});

  closestStationLine = new google.maps.Polyline({
    path:[{lat:userLat, lng:userLong},{lat:closestStation.stop_lat, lng:closestStation.stop_long}],
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3.75,
  });
  closestStationLine.setMap(map);
}

// //Haversine Function - from Stack Overflow
function haversineDistance(coords1,coords2,isMiles){
	Number.prototype.toRad=function(){
		return this*Math.PI/180;
	}

	var lat2 = coords2[0];
	var lon2 = coords2 [1];
	var lat1 = coords1 [0];
	var lon1 = coords1[1];
//Distance in km
	var R=6371;

	var x1 = lat2-lat1;
  	var dLat = x1.toRad();
  	var x2 = lon2-lon1;
  	var dLon = x2.toRad();
  	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
       	Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
 	var d = R * c * 1.60934;

  return d;
}

// //Get JSON data into my map
function loadStopTimes(){
	request.open("get", "https://rocky-taiga-26352.herokuapp.com/redline.json", true);
	request.send();
}
//
function funex(){
	if (request.readyState == 4 && request.status == 200){
		theData = request.responseText;
		trainSchedule = JSON.parse(theData);
	} else if (request.readyState == 4){
    //try again if failed
    loadStopTimes();
	}
}
