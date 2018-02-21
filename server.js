var http = require('http');
var fs = require('fs');

var allURLS = ["https://johnlaschobersoftwareengineering.azurewebsites.net/info.json", "http://alisp18.azurewebsites.net/myinfo.json"];
var allJSON = [];

var request = require('request'); // Imports library
var jsonData;
for (i = 0; i < allURLS.length; i++)
{
	request(allURLS[i], function (error, response, body)
	{
		if (!error && response.statusCode == 200) 
		{
			var importedJSON = JSON.parse(body);
			
			//console.log(importedJSON);
			allJSON.push(importedJSON);
			console.log(allJSON.length);
			if (allJSON.length == allURLS.length)
			{
				// You have all JSON objects
				// Now do stuff
			}
		}
	});
}

fs.writeFile("test.txt", jsonData, function(err) 
{
    if(err) 
	{
        return console.log(err);
    }
});

var server = http.createServer(function(request, response) 
{

    response.writeHead(200, {"Content-Type": "text/plain"});

	for (j = 0; j < allURLS.length; j++)
	{
		console.log(allJSON[j]);
	}

});

var port = process.env.PORT || 80;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
