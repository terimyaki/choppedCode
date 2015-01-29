//Scraping www.javascripting.com for list of available Javascript frameworks
var request = require("request");
var cheerio = require("cheerio");

//
var listOfGroups = [];

request('https://www.javascripting.com', function(error, response, htmlText){
	if (!error && response.statusCode == 200) {
   		$ = cheerio.load(htmlText);

   		//Get list of data items of all group types and links: ul id is "filter-sidebar"

   		$("#filter-sidebar li").each(function(index){
  			var self = $(this);
   			if(self.data("item") !== "all" && self.hasClass("has_children") === false){
   				var groupType = [];
   				groupType.push(self.data("itemPretty"));
   				groupType.push("https://www.javascripting.com" + self.find("a").attr("href"));
   				listOfGroups.push(groupType);
				}
			});
	}
	console.log("i am here");
	console.log(listOfGroups);
});

console.log(listOfGroups);
   		//Go to each link in the list: ul id is "item-list"
   		

   		//Get last page number for page: class of div is "pagination bottom"
   		//console.log($(".pagination bottom"));

   		//Get list of data items on each page and its links, name, short description: ul id is "item-list"
   		//console.log($("#item-list"));

function createChoice(name, type, subtype, language, description, link){
	//Create an object to be loaded into a database 
	return {
		name : name,
		type : type,
		subtype : subtype,
		language : language,
		description : description,
		link : link
	};
}
