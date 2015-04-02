//Scraping www.javascripting.com for list of available Javascript frameworks
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var cheerio = require('cheerio');
var __ = require('underscore-contrib');

function scrapeMain(body){
	var groupsList = [];
	$ = cheerio.load(body);

	//Get list of data items of all group types and links: ul id is "filter-sidebar"
	$('#filter-sidebar li').each(function(index){
		var self = $(this);
		if(self.data('item') !== 'all' && self.hasClass('has_children') === false){
				var namePretty = self.data('itemPretty');
				var link = createDirect(self.find('a').attr('href'));
				var aGroup = {name: namePretty, link:link};
				groupsList.push(aGroup);
		}
	});
	return groupsList;
}

function getNumPages(linkObj){
	return request(linkObj.link).spread(function(response, body){

			$ = cheerio.load(body);
			//Sets total of pages
			var total;
			if ($('.pagination.bottom ul > li').length > 1){
				total = $('.pagination.bottom ul > li').length - 1;
			}  else {
				total = 1;
			}

			var arr = [];
			for (var i = 0; i < total; i++){
				arr.push(createLink(linkObj, i+1));
			}
			return arr;
		}).catch(function(e){
			throw new Error(e);
		});
}

function poolLinks(linkObj){
	return request(linkObj.pageLink).spread(function(response, body){
				var listOfLinks = [];
				$ = cheerio.load(body);

				//gathers link and material
				var content = $('#content');
				if(content.children('h2') > 0){
					return listOfLinks;
				} else {
					var list = content.children('ul').children('li');
					list.each(function(){
						var obj = {};
						obj.name = $(this).find('a').text();
						obj.link = createDirect($(this).find('a').attr('href'));
						obj.description = $(this).find('p').text();
						obj.groupName = linkObj.groupName;
						obj.groupLink = linkObj.groupLink;
						listOfLinks.push(obj);
					});
					return listOfLinks;
				}
			}).catch(function(e){
				throw new Error(e);
			});
}

function createLink(obj, num){
	var objCopy = {};
	objCopy.groupName = obj.name;
	objCopy.groupLink = obj.link;
	objCopy.pageLink = obj.link + '?p=' + num;
	return objCopy;
}

function createDirect(part){
	return 'https://www.javascripting.com' + part;
}

// scrapeGroupSet();
// scrapeGroup({ name: 'Application Tools - Frameworks',
//     link: 'https://www.javascripting.com/application-tools/frameworks/' });
// scrapeLink('https://www.javascripting.com/application-tools/frameworks/?p=2');

var scrapeJavascripting = function(){
	return request('https://www.javascripting.com').spread(function(response, body){
			return scrapeMain(body);
		}).map(function(groupsEl){
			return getNumPages(groupsEl);
		})
		.then(function(linksArr){
			var links = __.flatten(linksArr);
			return Promise.map(links, function(el){
				return poolLinks(el);
			});
		}).then(function(links){
			return __.flatten(links);
		})
		.catch(function(err){
			throw new Error(err);
		});
};

module.exports = scrapeJavascripting;