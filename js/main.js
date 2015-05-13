$(document).ready(function(){

/*------------------------------------------MAPS SPECIFIC START CODE------------------------------------------*/

	//Initialize global variables
	var map;

	//Define functions
	function initialize() {
		var mapOptions = {
			zoom: 12,
			scrollwheel: false
		};
	
		map = new google.maps.Map(document.getElementById('map-section'), mapOptions);

		// Try HTML5 geolocation
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				var marker = new google.maps.Marker({
					position: pos,
					map: map
				});

				map.setCenter(pos);
			}, 
			function() {
				handleNoGeolocation(true);
			});
		} 
		else {
	    	// Browser doesn't support Geolocation
	    	handleNoGeolocation(false);
	  	}
	}

	function handleNoGeolocation(errorFlag) {
		if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		} 
		else {
	    	var content = 'Error: Your browser doesn\'t support geolocation.';
		}

		var options = {
			map: map,
			position: new google.maps.LatLng(60, 105),
			content: content
		};

		var infowindow = new google.maps.InfoWindow(options);
		map.setCenter(options.position);
	}

	//Event listeners
	google.maps.event.addDomListener(window, 'load', initialize);

/*------------------------------------------CALENDAR SPECIFIC START CODE------------------------------------------*/

	datePickerController.createDatePicker({
    formElements: {
        "moveInDate": "%d/%m/%Y"
    },
    // Position the activation button within the span
    nopopup: true
});
	datePickerController.createDatePicker({
    formElements: {
        "moveOutDate": "%d/%m/%Y"
    },
    // Position the activation button within the span
    nopopup: true
});

/*------------------------------------------ANIMATE SCROLLING WHEN SELECTING LINKS------------------------------------------*/

	$('.leftSideBar a').on('click', function() {
    	$.smoothScroll({
      		scrollElement: $('#listMyApartmentContent'),
      		scrollTarget: $(this).attr("href"),
      		speed: 1000
    	});
    	return false;
  	});

/*------------------------------------------GET NAME OF FILE AND FEED IT TO THE IFRAME SRC------------------------------------------*/

	$('#contractFile').on('change', function() {
		var filename = $('input[type=file]').val().replace(/C:\\fakepath\\/i, '')
		
		if (filename) {
			$(".contractDoc").attr("src", "/ViewerJS/docs/" + filename);
		}
	});

/*------------------------------------------GOOGLE PLUS SIGN IN CODE------------------------------------------*/
	
	// Additional params
	var additionalParams = {
		'theme' : 'dark',
		'callback': signinCallback
		};

	gapi.signin.render('loginButton', additionalParams);

	function signinCallback(authResult) {
		if (authResult['status']['signed_in']) {
	    	// Update the app to reflect a signed in user
	    	// Hide the sign-in button now that the user is authorized, for example:
	    	$('#loginButton').attr('style', 'display: none');
	    	$('#login h3').css('visibility', 'visible');
	  	} 
	  	else {
	    	// Update the app to reflect a signed out user
	    	// Possible error values:
	    	//   "user_signed_out" - User is signed-out
	    	//   "access_denied" - User denied access to your app
	    	//   "immediate_failed" - Could not automatically log in the user
	    	console.log('Sign-in state: ' + authResult['error']);
		}
	}

	$("#loginButton").on('click', function() {
    	gapi.auth.signIn(additionalParams); // Will use page level configuration
   	});
});



