var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var cheerio = require('cheerio');

function scrapeReddit(){
	return request('http://www.reddit.com/r/random')
			.spread(function(response, body){
				$ = cheerio.load(body);
				var subscribers = $('.subscribers').find('.number').text();
				var subreddit = $('.redditname').find('a').first();
				var name = subreddit.text();
				var url = subreddit.attr('href');
				var description = $('meta').filter(function(){
					return $(this).attr('property') === 'og:description';
				}).attr('content');
				return {
					name : name,
					url : url,
					subscribers: subscribers,
					description : description
				};
			})
			.catch(function(e){
				throw new Error(e);
			});
}

module.exports = scrapeReddit;