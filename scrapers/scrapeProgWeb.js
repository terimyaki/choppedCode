//Scraping www.for list of available Javascript frameworks
var request = require("request");
var cheerio = require("cheerio");

var moveToNextPage = function (){
	var pageNumber = 1;
	var listLinks = [];
	var paginationLast = "»";

	var checkIfLast = function(elText){
		return elText === "»";
	};
	
	var scrape = function(link){
		var list = [];
		request(link, function(error, response, htmlText){
			if (!error && response.statusCode == 200) {
	   			$ = cheerio.load(htmlText);
	   			paginationLast = $("div.pagination ul li").last().text();
	   			console.log(paginationLast);
	   			console.log(paginationLast === "»");
	   			console.log(checkIfLast(paginationLast));
	   			//Get list of data items of all group types and links: ul id is "filter-sidebar"

		   		$("#item-list li").each(function(index){
		  			var self = $(this);
	   				var name = self.find("a").text();
	   				var link = "https://www.javascripting.com" + self.find("a").attr("href");
	   				var description = self.find("p").text();
	   				var linkOption = new Option(name, link, description);
	   				list.push(linkOption);
				});
				pageNumber++;
	   			return list;
	   		}
		});
	};

};

console.log(moveToNextPage());
/*	var setLinks = scrape('https://www.javascripting.com/?p=' + pageNumber);
	listLinks = listLinks.concat(setLinks);

	console.log(checkIfLast(paginationLast));

	console.log(listLinks);
	// while()
	// var linkArray = [];
	// iteratorFunc(link, scrapFunc);
	// linkArray = linkArray.concat();
	// return linkArray;
};

moveToNextPage();
*/

function Option(name, link, description, groupName, groupLink){
	this.name = name;
	this.link = link;
	this.description = description;
	this.groupName = groupName || null;
	this.groupLink = groupLink || null;
}