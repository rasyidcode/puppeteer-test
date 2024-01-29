'use strict';

const puppeter = require("puppeteer");

(async () => {
    console.log('loading...');

    const browser = await puppeter.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Navigate the page to a URL
    await page.goto('https://tcbscans.com/');

    // home
    await Promise.all([
        page.waitForNavigation(),
        page.click('a[href="/projects"]')
    ]);

    // projects
    await Promise.all([
        page.waitForNavigation(),
        page.click('text/One Piece')
    ]);

    // const listChpTitleEl = await page.waitForSelector('text/List of Chapters');
    // const listChpTitle = await listChpTitleEl.evaluate(el => el.textContent);
    // console.log(listChpTitle);

    // return;

    // list chapters
    await Promise.all([
        page.waitForNavigation(),
        page.click('a.block.border.border-border.bg-card.mb-3.p-3.rounded')
    ]);

    // console.log('success clicking on latest chapter');

    // return;

    // reading
    const titleEl = await page.waitForSelector('text/One Piece');
    const title = await titleEl.evaluate(el => el.textContent);
    const images = await page.$$eval('picture.fixed-ratio img.fixed-ratio-content', im => im.map(m => {
        return {
            title: m.getAttribute('alt'),
            src: m.getAttribute('src'),
        }
    }));

    console.log('title: %s', title);
    console.log('images: %s', images[0])

    await browser.close();
})();