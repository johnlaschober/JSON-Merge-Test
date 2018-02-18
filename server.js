var http = require('http');

var allURLS = ["https://johnlaschobersoftwareengineering.azurewebsites.net/info.json", "http://alisp18.azurewebsites.net/myinfo.json"];
var allJSON = [];

var request = require('request'); // Imports library

for (i = 0; i < allURLS.length; i++)
{
	request(allURLS[i], function (error, response, body)
	{
		if (!error && response.statusCode == 200) 
		{
			var importedJSON = JSON.parse(body);
			console.log(importedJSON);
			allJSON[i] = JSON.stringify(importedJSON);
			console.log(allJSON[i]);
		}
	});
}

// Current problems:
// 1) Storing JSON as String in array simply to try to display it on the site
//  	^ Not recommended for final project, just for testing
// 2) I am awful at Javascript
// 3) allJSON array can successfully output to console at lines 15 and 17
//		but won't ouput when the server is called (array returns undefined).
//		Likely a javascript thing I don't know about.

// I think this is a good start to pull the JSON objects at least.
// Also I was testing all of this with NPM locally rather than Azure.

var server = http.createServer(function(request, response) 
{

    	response.writeHead(200, {"Content-Type": "text/plain"});
	for (i = 0; i < allURLS.length; i++)
	{
		//response.end(allJSON[i]); // Formatted as a string without linebreaks yuck
		//console.log(allJSON[i]);
	}

});

var port = process.env.PORT || 80;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
