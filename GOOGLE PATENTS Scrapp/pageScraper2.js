const https = require('https');
const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

const scraperObject = {
    url: 'https://patents.google.com/patent/CN109754886A/en?q=(health+and+medicine+ai)&oq=health+and+medicine+with+ai&page=64',
    async scraper(browser, searchQuery) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);

        // Adjust navigation timeout to disable it
        await page.goto(this.url, { timeout: 0 });

        // await page.type('#searchInput', searchQuery);
        // await page.click('#searchButton');

        // // Wait for the #htmlContent element to appear
        // await page.waitForSelector('#htmlContent');

        // // Click on the first element with the selector #htmlContent
        // await page.evaluate(() => {
        //     document.querySelector('#htmlContent').click();
        // });

        let hasNextPage = true;
        let data = [];
        while (hasNextPage) {
            try {
                // Wait for the #pubnum element to appear
                await page.waitForSelector('#pubnum');

                // Extract the text from the #pubnum element
                const pubNumText = await page.$eval('#pubnum', element => element.textContent.trim());

                // Extract the text from the #pubnum element
                const title = await page.$eval('h1#title', element => element.textContent.trim());

                // Extract the text from the #pubnum element
                const abstract = await page.$eval('#text > abstract > div', element => element.textContent.trim());

                // Extract all the text associated with the selector #link
                const inventors = await page.$$eval('#wrapper > div:nth-child(3) > div.flex-2.style-scope.patent-result > section > dl.important-people.style-scope.patent-result > dd:nth-child(4) > state-modifier', elements => elements.map(element => element.textContent.trim()));

                // Extract the publication date from the div with class 'publication' within the 'application-timeline' section
                const publicationDate = await page.$eval('div.publication.style-scope.application-timeline', element => element.textContent.trim());

                // Extract the PDF link
                const pdfLink = await page.$eval('#wrapper > div:nth-child(3) > div.flex-2.style-scope.patent-result > section > header > div > a', element => element.getAttribute('href'));

                data.push({
                    Publication_Number: pubNumText,
                    Title: title,
                    Abstract: abstract,
                    Inventors: inventors.join(', '), // Convert array to string
                    Publication_Date: publicationDate,
                    PDF_Link: pdfLink
                });

                console.log(`Data scraped for Patent Number: ${pubNumText}`);
            } catch (error) {
                console.error('Error occurred while scraping patent:', error);
            }

            try {
                // Wait for the element with the id nextResult to appear
                await page.waitForSelector('#nextResult', { visible: true });

                // Click on the element with id nextResult
                await page.click('#nextResult');
            } catch (error) {
                console.error('Error occurred while trying to click the icon:', error);
                hasNextPage = false; // Set hasNextPage to false if there are no more pages
            }
        }

        // Close the browser
        await browser.close();

        // Convert data to CSV format
        const json2csvParser = new Parser();
        const csvData = json2csvParser.parse(data);

        // Define the file path to save the CSV file
        const csvFileName = 'patents.csv';
        const csvDirectoryPath = path.join(__dirname, 'csv');
        const csvFilePath = path.join(csvDirectoryPath, csvFileName);

        // Ensure the 'csv' directory exists
        if (!fs.existsSync(csvDirectoryPath)) {
            fs.mkdirSync(csvDirectoryPath);
        }

        // Append the CSV data to the file (or create a new file if it doesn't exist)
        fs.appendFileSync(csvFilePath, csvData);

        console.log(`Data appended to CSV file: ${csvFileName}`);
    }
};

module.exports = scraperObject;
