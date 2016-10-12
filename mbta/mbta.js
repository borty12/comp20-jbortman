var map;
var parsedData;

function initMap(){
	request = new XMLHttpRequest();
	request.open("get", "https://rocky-taiga-26352.herokuapp.com/redline.json", true);
	request.onreadystatechange = funex;
	request.send();
}

function funex(){
	console.log("called funex" + request.readyState);
	if (request.readyState == 4 && request.status == 200){
		theData=request.responseText;
		funex = JSON.parse(theData);
		newHTML = "";
		section = document.getElementById("map");

	}
}

map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 12
});