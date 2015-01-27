var request = require("request");
var cheerio = require("cheerio");

request('http://www.javascripting.com', function(error, response, html){
	if (!error && response.statusCode == 200) {
   		console.log(html);
   		$ = cheerio.load(html);
	}
});

function createChoice(name, type, subtype, language, description, link){
	//Create an object to be loaded into a database 
	return {
		name : name,
		type : type,
		subtype : subtype,
		language : language,
		description : description,
		link : link
	}
}

function createLinksList(){

}