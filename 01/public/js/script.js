$( document ).ready(function() {

  // Format data
  $.get('/data', function(err, measurements) {

    var dates = [];
    var temperature = [];
    var humidity = [];

    for (i = 0; i < measurements.length; i++) {

        dates.append(measurements[i].date);
        temperature.append(measurements[i].temperature);
        humidity.append(measurements[i].temperature);

    }

    // Plot
    $('#container').highcharts({
        title: {
            text: 'Temperature & Humidity Data',
            x: -20 //center
        },
        xAxis: {
            categories: dates
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Temperature',
            data: temperature
        },
        {
            name: 'Humidity',
            data: humidity
        }]
    });

    });
});