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
var tempSensor = mcpadc.open(channel, {speedHz: 20000}, function (err) {
  if (err) throw err;

  // Measurement interval
  setInterval(function () {
    tempSensor.read(function (err, reading) {
      if (err) throw err;

      // Calculate current
      var measuredVoltage = reading.value * 3.3;
      var measuredCurrent = (measuredVoltage/resistance) * 2000;

      // Calculate power
      var power = voltage * measuredCurrent / 1.41;

      // Assign to aREST
      piREST.variable('power', power);
      piREST.variable('current', measuredCurrent);

      // Log output
      console.log("Measured current: " + measuredCurrent);
      console.log("Measured power: " + power);

    });
  }, 2000);
});
