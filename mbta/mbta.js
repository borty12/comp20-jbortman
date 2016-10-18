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
	scaledSize: new google.maps.Size(50,50),
}

//Marker for my location
function markerMaker(markerposition, markertitle, markericon){
	let marker = new google.maps.Marker({
		position: markerposition,
		title: markertitle,
		icon: markericon,
	});

  marker.setMap(map);
  findNearest();

//Info windows
var infowindow = new google.maps.InfoWindow();

google.maps.event.addListener(stationMarker, 'click', function(){
	request.open("get", "https://rocky-taiga-26352.herokuapp.com/redline.json", true);
	request.send();
});

return marker;

//Only add data if downloaded
let windowContent = "<h1>" + stop.stop_name + ":" + "</h1>"; 
       if(dataWasParsed) {
         windowContent += "\ " + setUpJSONInfo(stop.stop_name);
       } else {
         windowContent += "Oops! Data unavailable. Try back later!";
       }

       infowindow.setContent(windowContent);
       infowindow.open(map,stopMarker);
     };
  };
 }

}

//
//Getting T-Stops on the map
let stationIcon = {
	url: "station_icon.png",
	scaledSie: new google.maps.Size(30,30),
}

stations.forEach((station) function(){
	let stopLocation = new google.maps.LatLng(stop.stop_lat, stop.stop_long);
	stationMarker = markerMaker(stoplocation, stop.stop_name,{stationIcon})
});

stationMarker.setMap(map);
allStationMarkers.push(stationMarker);

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
// 	if (request.readyState == 4 && request.status == 200){
// 		theData=request.responseText;
// 		funex = JSON.parse(theData);
// 		dataWasParsed = true; 
// 		section = document.getElementById("map");
//
// 	}
	else{
		dataWasParsed = false;
      	console.clear();
     	request.open("get", "https://rocky-taiga-26352.herokuapp.com/redline.json", true);
        request.send(); 

	}
// }

// map = new google.maps.Map(document.getElementById('map'), {
//   center: {lat: -34.397, lng: 150.644},
//   zoom: 12
// });

//Next train schedule

function JSONInfo(stopName){
	let stopList=[]
	parsedData.TripList.Trips.forEach((destinations) function(){
		destinations.Predictions.forEach(function(prediction){
			if (prediction.Stop==stopName){
				stopList.push(prediction.Seconds);
			}
		});
	});
	return makeNearestString(stopList);
}


//Array to string conversion
function makeNearestString(stopList){
	//This was taken from W3schools api
	stopList.sort((a,b) function(){return a-b});
	let nextTrains = "<h2>Next Arrival (Minutes)</h2>";
	if(stopList.length==0) nextTrains="No Arrivals Expected at this Stop";
	stopList.forEach(function(time){
		if(time>0 && time<60){
			let timeInMinutes=(time/60).toFixed(2);
			nextTrains+=""+timeInMinutes.toString();
		}
	});
	return nextTrains;
}

//Train Station Polylines
function addPolylines(){
	let line1 = getCoords(main);
	part1 = new google.maps.Polyline({
		path: line1,
		strokeColor: '#ff0000',
		strokeOpacity: 1.0,
		strokeWeight: 2.75,
	});

	part1.setMap(map);

	let line2 = getCoords(forkright);
	part2 = new google.maps.Polyline({
		path: line2,
		strokeColor: '#ff0000',
		strokeOpacity: 1.0,
		strokeWeight: 2.75,
	});

	part2.setMap(map);

//Draw Polylines
	myLine = new google.maps.Polyline({
		line: [{lat:myLat, lng:myLong}, {lat: closestStop.stop_lat, lng:closestStop.stop_long}],
		strokeColor: '#000000'
		strokeOpacity: 1.0,
		strokeWeight: 2.75,
	});

	myPath.setMap(map);
}

//Haversine Function - from Stack Overflow
function findNearest(){
	coords1 = [myLong, myLat];
	tStops.forEach(function(stop,index){
		let coords2 = [stop.stop_long, stop.stop_lat];
		let stopDist = haversineDistance(coords1, coords2, true);
		if (index == 0){
		closestDist = stopDist;
		}
		if (stopDist<closestDist){
			closestDist = stopDist;
			closestStop = stop;
		}
	});

function haversineDistance(coords1,coords2,isMiles){
	Number.prototype.toRad=function(){
		return this*Math.PI/180;
	}

	var lat2 = coords2[1];
	var lon2 = coords2 [0];
	var lat1 = coords1 [1];
	var lon1 = coords1[0];
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

}
}

//Info Window Content
let closestInfo="<div class=infoWindow"+
"Closest Stop is:"+"<span class=important>"+
closestDist.toFixed(3)+
"</span>"+
"path"+
"</div>";
var infowindow = new google.maps.InfoWindow();
google.maps.event.addListener(personMarker, 'click', function(){
	infowindow.setContent(closestInfo);
	infowindow.open(map,personMarker);
});

