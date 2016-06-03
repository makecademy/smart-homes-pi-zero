$( document ).ready(function() {

  // Get data
  $.get('/get', function(data) {

    $('#thermostat').text(data.targetTemperature);

  });

  $.get('/temperature', function(data) {

    $('#temperature').text(data.temperature);

  });


});
