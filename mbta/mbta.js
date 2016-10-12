<script>
	var map;
	function initMap(){
		map= new google.maps.Map(document.getElementById('map'),{
			center: {lat: -34.397, lng: 150.644},
			zoom: 8 
		});
</script>

 <script async defer
      src="https://maps.googleapis.com/maps/api/js?key=https://rocky-taiga-26352.herokuapp.com/redline.json&callback=initMap">
    </script>
