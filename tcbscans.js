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

    const pageTitle = await page.title();

    console.log('pageTitle: %s', pageTitle);

    await page.click('a[href="/projects"]');

    const mangaTitle = await page.waitForSelector('h1.text-2xl.font-bold');
    const mangaText = await mangaTitle.evaluate((el) => el.textContent);

    console.log('headerTitle: %s', mangaText);

    const firstMangaEl = await page.waitForSelector('.bg-card.border.border-border.rounded.p-3.mb-3');
    const firstManga = await firstMangaEl.evaluate(el => el.querySelector('a.mb-3.text-white.text-lg.font-bold').textContent);
    const mangaList = await page.$$eval('.bg-card.border.border-border.rounded.p-3.mb-3', ms => ms.map(m => {
        return {
            title: m.querySelector('a.mb-3.text-white.text-lg.font-bold').textContent,
            url: m.querySelector('a.mb-3.text-white.text-lg.font-bold').getAttribute('href'),
            imageUrl: m.querySelector('a img').getAttribute('src')
        };
    }));

    console.log('firstManga: %s', firstManga);
    console.log('mangaCount: %d, firstManga: %s', mangaList.length, mangaList[0]);

    await browser.close();
})();