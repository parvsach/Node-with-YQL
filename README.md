# Node-with-YQL

Get Weather Details of any City using Yahoo Weather API's with Node js using async and request modules.

Steps to run:

1. Run "npm install" to install the packages.

2. Add name of the city and region in cities array:

   var cities = [{
    "city": "Delhi",
    "region": "DL"
  }, {
    "city": "Gurgaon",
    "region": "HR"
  }];
  
3. Run app.js file: Server Listening on port: 3000

4. Browse to http://localhost:3000/temprature to get JSON as name of the city wit temprature.
