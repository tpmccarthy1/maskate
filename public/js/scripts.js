$( document ).ready(function() {

console.log("running");

var map;
var marker;

function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(40.680898,-8.684059),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  
  //get all park locations and add address to array
  var local = $.parseJSON($('#parkLocs').val());
  if(local.length > 1){
  var addressArr = [];
  for(var i=0; i<local.length; i++){
  	addressArr.push(local[i].street + " " + local[i].town + " " + local[i].state);
  	}
 } else{
 	var addressArr = local.street + " " + local.town + " " + local.state;
 }

  //Geocode addresses of all parks and set markers
  
  var geocoder = new google.maps.Geocoder();
  	if(Array.isArray(addressArr)){
	  for(var z=0; z<addressArr.length; z++){
	  geocoder.geocode({address: addressArr[z]}, function(results, status) {

	    if (status == google.maps.GeocoderStatus.OK) {

	      var myResult = results[0].geometry.location; // reference LatLng value

	      marker = new google.maps.Marker({
	      map: map,
	      position: myResult
	  	  });

	      map.setCenter(myResult);

	      map.setZoom(7);

	    	}
	  	});
	  };
	} else{
		geocoder.geocode({address: addressArr}, function(results, status) {

	    if (status == google.maps.GeocoderStatus.OK) {

	      var myResult = results[0].geometry.location; // reference LatLng value

	      marker = new google.maps.Marker({
	      map: map,
	      position: myResult
	  	  });

	      map.setCenter(myResult);

	      map.setZoom(12);

	    	}
	  	});
	} 
}  

initialize();

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








