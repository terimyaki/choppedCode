//Scraping www.javascripting.com for list of available Javascript frameworks
var request = require("request");
var cheerio = require("cheerio");


request('https://www.javascripting.com', function(error, response, htmlText){

	var listOfGroups = [];

	if (!error && response.statusCode == 200) {
   		$ = cheerio.load(htmlText);

   		//Get list of data items of all group types and links: ul id is "filter-sidebar"

   		$("#filter-sidebar li").each(function(index){
  			var self = $(this);
   			if(self.data("item") !== "all" && self.hasClass("has_children") === false){
	   				var namePretty = self.data("itemPretty");
	   				var link = "https://www.javascripting.com" + self.find("a").attr("href");
	   				var aGroup = new Group(namePretty, link);
	   				listOfGroups.push(aGroup);
				}
			});
   		console.log(listOfGroups);

   		/*//Loops through List of Groups
   		if(listOfGroups !== []){
			for(var i = 0; i < listOfGroups.length; i++){
				console.log(scrapeGroup(listOfGroups[i]));
			}
		}*/
	}

});

function scrapeGroup(groupObj){
	return request(groupLink, function(error, response, htmlText){
		if(!error && response.statusCode == 200){
			$ = cheerio.load(htmlText);

			return("this is " + groupLink);
		} else if(response.statusCode == 400){
			return null;
		}
	});
}

function Group(name, link){
	this.name = name;
	this.link = link;
}

function Option(name, link, description, groupName, groupLink){
	this.name = name;
	this.link = link;
	this.description = description;
	this.groupName = groupName;
	this.groupLink = groupLink;
}

   		//Go to each link in the list: ul id is "item-list"

   		//Get last page number for page: class of div is "pagination bottom"
   		//console.log($(".pagination bottom"));

   		//Get list of data items on each page and its links, name, short description: ul id is "item-list"
   		//console.log($("#item-list"));

/*function createChoice(name, type, subtype, language, description, link){
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
*/