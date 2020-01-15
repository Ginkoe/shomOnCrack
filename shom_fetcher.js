const puppeteer = require('puppeteer');

async function fetcher(harbor) {
    return new Promise(async (resolve, reject) => {
        let possibleRequests = [];
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        console.log("Fetching ...")
        // Responses Event Handler
        page.on('response', async response => {
            const url = response.url();

            if (url.includes("harborName=")) {
                console.log("Found")
                possibleRequests.push(response.json())
            }
        })
        const reqURL = `https://maree.shom.fr/harbor/${harbor}`;
        console.log(reqURL)
        await page.goto(reqURL, {waitUntil: 'networkidle2'});
        await page.close();
        await browser.close();
        resolve(possibleRequests.pop())
    })
}

module.exports = fetcher;