var request = require('request'); // Imports libraries
var http = require('http');
var fs = require('fs');

// Define URLs here
var allURLS = ["https://csoftware.azurewebsites.net/groupinfo.json", "https://johnlaschobersoftwareengineering.azurewebsites.net/info.json", "https://cpsc440.azurewebsites.net/myInfo.json", "http://alisp18.azurewebsites.net/myinfo.json"];
// Where JSON objects will be stored
var allJSON = [];

var concattedJSON;
var finalJSON;
for (i = 0; i < allURLS.length; i++) // Initiates on server launch
{
	request(allURLS[i], function (error, response, body)
	{
		if (!error && response.statusCode == 200) 
		{
			var importedJSON = JSON.parse(body);
			allJSON.push(importedJSON);
			//console.log(allJSON.length);
			if (allJSON.length == allURLS.length)
			{
				// You have all JSON objects
				// Now do stuff
				// Like make a big, concatenated JSON file
				// idk
				var concattedJSON = "";
				concattedJSON = '{"members":[';
				for (j = 0; j < allURLS.length; j++)
				{
					concattedJSON += JSON.stringify(allJSON[j]);
					if (j != allURLS.length - 1)
					{
						concattedJSON += ',';
					}
				}
				concattedJSON += ']}';
				//console.log(concattedJSON);
				finalJSON = JSON.parse(concattedJSON);
				console.log(finalJSON);
				/*
				var stringFinal = JSON.stringify(finalJSON, null, 4);
				fs.writeFile("groupJSON.json", stringFinal,'utf-8', function(err)  // File writer for saving a json file, not done
				{
					if(err) 
					{
						return console.log(err);
					}
				});
				*/
				
			}
		}
	});
} // Should make this a function so we call updates whenever



var server = http.createServer(function(request, response)  // On user connect
{

    response.writeHead(200, {"Content-Type": "text/plain"});

	//var importedJSON = JSON.parse(fs.readFileSync('groupJSON.json', 'utf8'));
	var displayJSON = JSON.stringify(finalJSON);
	response.write(displayJSON);
	response.end();
	//response.end(importedJSON);

});

var port = process.env.PORT || 80;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
