// Modules
var mcpadc = require('mcp-spi-adc');
var express = require('express');
var app = express();
var piREST = require('pi-arest')(app);

// ADC channel
var channel = 5;

// Load resistance
var resistance = 70;

// AC voltage
var voltage = 230; // Europe

// ID should be 6 characters long
piREST.set_id('34f5eQ');
piREST.set_name('energy_meter');
piREST.set_mode('bcm');

// Variables
current = 0;
power = 0;

// Start server
var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});

// Sensor measurement loop
var sensor = mcpadc.open(channel, {speedHz: 20000}, function (err) {
  if (err) throw err;

  // Measurement interval
  setInterval(function () {

    // Init measurement
    var measurement = 0;

    for (i = 0; i < 20; i++) {

      // Measure
      sensor.read(function (err, reading) {
        if (err) throw err;

        // Take max of measurements
        measurement = max(measurement, reading.value);
      });

    }

    // Calculate current
    var measuredVoltage = measurement * 3.3;
    var measuredCurrent = (measuredVoltage/resistance) * 2000 / 1.41;

    // Calculate power
    var power = voltage * measuredCurrent;

    // Assign to aREST
    piREST.variable('power', power.toFixed(2));
    piREST.variable('current', measuredCurrent.toFixed(2));

    // Log output
    console.log("Measured current: " + measuredCurrent.toFixed(2) + 'A');
    console.log("Measured power: " + power.toFixed(2) + 'W');


  }, 1000);
});
