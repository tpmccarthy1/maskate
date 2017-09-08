
$( document ).ready(function() {

console.log("running");

//Create page
//Dynamically display Counties based on State
$("#state").change(function() {
	console.log("changed");
  if ($(this).data('options') === undefined) {
    /*Taking an array of all options-2 and kind of embedding it on the select1*/
    $(this).data('options', $('#county option').clone());
  }
  var id = $(this).val();
  var options = $(this).data('options').filter('[class=' + id + ']');
  $('#county').html(options);
});


// If a link has a dropdown, add sub menu toggle.
$('nav ul li a:not(:only-child)').click(function(e) {
	$(this).siblings('.nav-dropdown').toggle();
		// Close one dropdown when selecting another
		$('.nav-dropdown').not($(this).siblings()).hide();
		e.stopPropagation();
	});
	// Clicking away from dropdown will remove the dropdown class
	$('html').click(function() {
		$('.nav-dropdown').hide();
	});
	// Toggle open and close nav styles on click
	$('#nav-toggle').click(function() {
		$('nav ul').slideToggle();
	});
	// Hamburger to X toggle
	$('#nav-toggle').on('click', function() {
		this.classList.toggle('active');
	});


});


//Google maps

function initMap() {
		var longlat;
		var local = JSON.parse($('#parkLocs').val());
		var addressInput = local[0].street + " " + local[0].town + " " + local[0].state;
		console.log(addressInput);
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({address: addressInput}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					 var longlat = results[0].geometry.location;
					 console.log(longlat);
	   			}

		})
        var uluru = longlat;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
