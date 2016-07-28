// Required modules
var request = require('request');
var gpio = require('rpi-gpio');

// IFTTT data
var key = "dPMHywdahaSxQZlCaoqnzHxcQ8vNYsTlk";
var eventName = 'motion_detected';

// Motion sensor GPIO
var motionSensorPin = 18;

// Counter between two alerts
var interval = 10 * 1000; // 1 minute
var counter = new Date();

// Setup gpio library
gpio.setMode(gpio.MODE_BCM);

// Check status every second
setInterval(function() {

  // Check counter so we don't trigger alarms all the time
  var currentTime = (new Date()).getTime();
  var counterTime = counter.getTime();

  console.log('Current time difference: ' + (currentTime - counterTime));

  if ( (currentTime - counterTime) > interval) {

    // Check sensor
    gpio.setup(motionSensorPin, gpio.DIR_IN, checkSensor);

  }

}, 1000);

// Check motion sensor
function checkSensor() {
  gpio.read(motionSensorPin, function(err, value) {

      console.log('Sensor value: ' + value);

      // If motion is detected, send event to IFTTT
      if (value == true) {

        // Restart Counter
        counter = new Date();

        // Send event
        alertIFTTT();
      }
  });
}

// Make request
function alertIFTTT() {

  // Send alert to IFTTT
  console.log("Sending alert to IFTTT");
  var url = 'https://maker.ifttt.com/trigger/' + eventName + '/with/key/' + key;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Alert sent to IFTTT");
    }
  });
}
