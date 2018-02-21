var request = require('request'); // Imports libraries
var http = require('http');
var fs = require('fs');

// Define URLs here
var allURLS = ["https://johnlaschobersoftwareengineering.azurewebsites.net/info.json", "http://alisp18.azurewebsites.net/myinfo.json"];
// Where JSON objects will be stored
var allJSON = [];





for (i = 0; i < allURLS.length; i++) // Initiates on server launch
{
	request(allURLS[i], function (error, response, body)
	{
		if (!error && response.statusCode == 200) 
		{
			var importedJSON = JSON.parse(body);
			allJSON.push(importedJSON);
			console.log(allJSON.length);
			if (allJSON.length == allURLS.length)
			{
				// You have all JSON objects
				// Now do stuff
				// Like make a big, concatenated JSON file
				// idk
			}
		}
	});
} // Should make this a function so we call updates whenever

var jsonData; // Should be set to the final concatenated megaJSON file eventually
fs.writeFile("test.txt", jsonData, function(err)  // File writer for saving a json file, not done
{
    if(err) 
	{
        return console.log(err);
    }
});

var server = http.createServer(function(request, response)  // On user connect
{

    response.writeHead(200, {"Content-Type": "text/plain"});

	for (j = 0; j < allURLS.length; j++)
	{
		console.log(allJSON[j]); // Working correctly, verifies we have our data stored correctly
	}

});

var port = process.env.PORT || 80;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
