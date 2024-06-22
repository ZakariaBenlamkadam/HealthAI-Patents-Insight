const pageScraper = require('./pageScraper2');
async function scrapeAll(browserInstance){
	let browser;
	try{
		browser = await browserInstance;
        const searchQuery='health and artificial intelligence';

		await pageScraper.scraper(browser, searchQuery);	
		
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance) => scrapeAll(browserInstance)