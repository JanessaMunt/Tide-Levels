
//test data
var stations = [
				{lat: 46.1879, long: -123.8313, ID:"9439040", distance: 0, name: "Oregon"},
				{lat: 29.4242, long: -98.4936, ID:"8774230", distance: 0, name: "Texas"},
				{lat: 46.2865, long: -124.0626, ID:"9440581", distance: 0, name: "Washington"}
				];

//get location and store lat/long
var lat;
var long;

main();

function main(){
	var temp;
//	get location lat and long
	navigator.geolocation.getCurrentPosition(function(location) {
	  lat = location.coords.latitude;
	  long = location.coords.longitude;

	// lat = 45.5274;
	// long = 122.6808;
	  getTides(); //get data and add it
	  findClosest();

	});


}

function getTides(){
	var distance = calcDistance(lat, long, stations[1].lat, stations[1].long); 

	//get distance to each station
	stations.forEach(function(element){
		element.distance = calcDistance(lat, long, element.lat, element.long);
	});


	for (var i = 0 ; i < 3; i++) {
		console.log("distance is " + stations[i].distance);
	}

}

function calcDistance(lat1, long1, lat2, long2){
	var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat1, long1), new google.maps.LatLng(lat1, long2));  
	return distance;
}

function findClosest(){
	var closest = stations[0].distance;
	var index = 0;

	for (var i =0; i<stations.length; i++){
		if (closest > stations[i].distance) {
			closest = stations[i].distance;
			index = i;
		}
	}

	$(".closest").text(stations[index].name);
	console.log(stations[index].name);
}