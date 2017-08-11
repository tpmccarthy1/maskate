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

});