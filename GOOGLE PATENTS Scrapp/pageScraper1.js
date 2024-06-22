const https = require('https');
const fs = require('fs');
const path = require('path');

const scraperObject = {
    url: 'https://patents.google.com/',
    async scraper(browser, searchQuery) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);

        // Adjust navigation timeout to disable it
        await page.goto(this.url, { timeout: 0 });

        await page.type('#searchInput', searchQuery);
        await page.click('#searchButton');

        // Wait for the #htmlContent element to appear
        await page.waitForSelector('#htmlContent');

        // Click on the first element with the selector #htmlContent
        await page.evaluate(() => {
            document.querySelector('#htmlContent').click();
        });

        await page.click('#link iron-icon');



        
    }
}

module.exports = scraperObject;
