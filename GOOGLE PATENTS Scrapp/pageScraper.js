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
        

        
        // Wait for the #pubnum element to appear
        await page.waitForSelector('#pubnum');

        // Extract the text from the #pubnum element
        const pubNumText = await page.$eval('#pubnum', element => element.textContent.trim());

        // Write the extracted text to the console
        console.log("Publication Number:", pubNumText);

        // Extract the text from the #pubnum element
        const title = await page.$eval('h1#title', element => element.textContent.trim());

        // Write the extracted text to the console
        console.log("Title:", title);

        // Extract the text from the #pubnum element
        const abstract = await page.$eval('#text > abstract > div', element => element.textContent.trim());

        // Write the extracted text to the console
        console.log("Abstract:", abstract);

        // Extract all the text associated with the selector #link
        const inventors = await page.$$eval('#wrapper > div:nth-child(3) > div.flex-2.style-scope.patent-result > section > dl.important-people.style-scope.patent-result > dd:nth-child(4) > state-modifier', elements => elements.map(element => element.textContent.trim()));

        // Log all the extracted text to the console
        console.log("Inventors:", inventors);

        // Extract the publication date from the div with class 'publication' within the 'application-timeline' section
        const publicationDate = await page.$eval('div.publication.style-scope.application-timeline', element => element.textContent.trim());

        // Write the extracted publication date to the console
        console.log("Publication Date:", publicationDate);


        // Extract the text content of all <li> elements within the <ul> with the selector #text > ul
        //const allLiTexts = await page.$$eval('#text > ul > li', elements => elements.map(element => element.textContent.trim()));

        // Log all the extracted text to the console
        //console.log("Text of all <li> elements:", allLiTexts);


        const pdfLink = await page.$eval('#wrapper > div:nth-child(3) > div.flex-2.style-scope.patent-result > section > header > div > a', element => element.getAttribute('href'));

        // Define the file path to save the PDF in the 'pdfs' directory at the root of your project
        const pdfFileName = `${pubNumText}.pdf`;
        const pdfDirectoryPath = path.join(__dirname, 'pdfs');
        const filePath = path.join(pdfDirectoryPath, pdfFileName);
        
        // Ensure the 'pdfs' directory exists
        if (!fs.existsSync(pdfDirectoryPath)) {
            fs.mkdirSync(pdfDirectoryPath);
        }
        
        // Download the PDF document
        const file = fs.createWriteStream(filePath);
        https.get(pdfLink, function(response) {
            response.pipe(file);
            console.log(`PDF downloaded: ${pdfFileName}`);
        });

        
        
        
        // Close the browser
        await browser.close();
    }
}

module.exports = scraperObject;
