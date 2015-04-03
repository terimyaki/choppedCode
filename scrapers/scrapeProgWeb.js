//Scraping www.programmableweb.com for list of available Javascript frameworks
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var cheerio = require('cheerio');
var __ = require('underscore-contrib');

function getNumPages(){
	return request('http://www.programmableweb.com/apis/directory').spread(function(response, body){
		var pagesList = [];
		$ = cheerio.load(body);

		var pages = parseInt($('.pagination .pager-next').text());
		for(var i = 0; i < pages; i++){
			pagesList.push(createPageLink(i));
		}

		return pagesList;

	}).catch(function(e){
		throw new Error(e);
	});
}

function poolLinks(link){
	return request(link).spread(function(response, body){
		var listOfLinks = [];
		$ = cheerio.load(body);

		var content = $('.view-id-search_apis');
		//console.log(content.html());
		if(content.children('div').attr('class') === 'view-empty'){
			return listOfLinks;
		}
		var list = content.find('tbody').children('tr');
		list.each(function(){
			var childList = $(this).children('td');
			var obj = {};
			obj.name = childList.eq(0).find('a').text();
			obj.link = createLink(childList.eq(0).find('a').attr('href'));
			obj.description = rmNewLinesTrimWS(childList.eq(1).text());
			obj.groupName = rmNewLinesTrimWS(childList.eq(2).find('a').text());
			listOfLinks.push(obj);
		});
		return listOfLinks;
	}).catch(function(e){
		throw new Error(e);
	});
}

function rmNewLinesTrimWS(str){
	return str.replace('/\n/g', '').trim();
}

function createPageLink(num){
	return 'http://www.programmableweb.com/apis/directory?page=' + num;
}

function createLink(partial){
	return 'http://www.programmableweb.com' + partial;
}

function scrapeProgWeb(){
	return getNumPages().map(poolLinks)
	.then(function(arr){
		console.log('Finished scraping Programmable Web...');
		return __.flatten(arr);
	})
	.catch(function(e){
		throw new Error(e);
	});
}

module.exports = scrapeProgWeb();