var http = require('http');
var express = require('express');
var async = require('async');
var request = require('request');

var app = express();

app.set('port', process.env.PORT || 3000);

var cities = [{
    "city": "Delhi",
    "region": "DL"
}, {
    "city": "Gurgaon",
    "region": "HR"
}];

app.get('/temprature', function(req, res, next) {
    async.map(cities, function(url, callback) {

        var yql = "select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + url.city + "%2C%20" + url.region + "%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

        var URL = "https://query.yahooapis.com/v1/public/yql?q=" + yql;

        request(URL, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, body);
            } else {
                callback(error || response.statusCode);
            }
        });
    }, function(err, results) {
        if (!err) {
            var data = [];
            for (var i = 0; i < results.length; i++) {
                var city_output = JSON.parse(results[i]).query.results.channel.location.city;
                var temp_output = JSON.parse(results[i]).query.results.channel.item.condition.temp;
                data.push({
                    "city": city_output, "temp": temp_output
                });
            }
            var data = JSON.stringify(data);
            res.json(data);
            res.end();
        } else {
            // handle error here
        }
    });
});

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('Server listening on port ' + app.get('port'));
});
