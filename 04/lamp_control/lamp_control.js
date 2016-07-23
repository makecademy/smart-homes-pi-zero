// Modules
var express = require('express');

// Express app
var app = express();

// Pin
var lampPin = 18;

// Use public directory
app.use(express.static('public'));

// Routes
app.get('/', function (req, res) {

  res.sendfile(__dirname + '/public/interface.html');

});

app.get('/on', function (req, res) {

  piREST.digitalWrite(lampPin, 1);

});

app.get('/off', function (req, res) {

  piREST.digitalWrite(lampPin, 0);

});

// aREST
var piREST = require('pi-arest')(app);
piREST.set_id('34f5eQ');
piREST.set_name('my_rpi_zero');

// Start server
app.listen(3000, function () {
  console.log('Raspberry Pi Zero lamp control started!');
});
