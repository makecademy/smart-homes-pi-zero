$( document ).ready(function() {

  console.log( "ready!" );

  // Get data
  $.get('/get', function(data) {

    console.log(data);
    $('#thermostat').html(data.targetTemperature);

  });

  $.get('/temperature', function(data) {

    console.log(data);
    $('#temperature').html(data.temperature);

  });


});
