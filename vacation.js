$(function(){
	var geocoder,
		map,
		lastCity;

	google.maps.event.addDomListener(window, 'load', initialize);
	spin();

	function spin(){
		$(".roller ul").css('animation', 'scroll-numbers 1s linear infinite');
		$(".stop").text("Stop").off().on("click", stop);
	}

	function stop(){
		var randomIndex = pickRandomIndex();
		var city = $($(".roller li").get(randomIndex)).text();
		var top = (randomIndex * -2);
		$(".roller ul").css({  "top": top+"em", "animation": "none"  });
		geocodeAddress(city);
		$(".stop").text("Respin").off().on("click", spin);
	}

	function pickRandomIndex(){
		return Math.floor(Math.random() * ($(".roller li").length - 1 + 1));
	}

	function initialize() {
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(-24, 117.5);
		var mapOptions = {
			zoom: 12,
			center: latlng,
    	disableDefaultUI: true
		}
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		geocodeAddress("Manchester, NH");
	}

	function geocodeAddress(addr) {
		lastCity = addr;
		geocoder.geocode( { 'address': addr}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				});
			} 
			else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	}

});
