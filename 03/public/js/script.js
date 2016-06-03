$( document ).ready(function() {

  // Get data
  $.get('/get', function(data) {

    $('#thermostat').html(data.targetTemperature);

  });

  $.get('/temperature', function(data) {

    $('#temperature').html(data.temperature);

  });


});
