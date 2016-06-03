$( document ).ready(function() {

  // Get data
  $.get('/get', function(data) {

    $('#thermostat').val(data);

  });

  $.get('/temperature', function(data) {

    $('#temperature').val(data);

  });


});
