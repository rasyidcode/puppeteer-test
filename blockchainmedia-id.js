'use strict';

const puppeter = require("puppeteer");

(async () => {
    console.log('init browser...');
    const browser = await puppeter.launch({ headless: 'new' });

    console.log('init new page...');
    const page = await browser.newPage();

    // Set screen size
    console.log('working with viewport...');
    await page.setViewport({ width: 1080, height: 1024 });

    // Navigate the page to a URL
    console.log('navigating to url...');
    await page.goto('https://blockchainmedia.id/');

    // data fetcing
    console.log('fetcing data...');
    const pageTitle = await page.title();
    // const articles = await page.$$eval('h3.entry-title.td-module-title', articles => articles.map(article => article.firstChild.textContent));
    // const articles = await page.$$eval('div.td-module-container', articles => articles.map(article => {
    //     const aElement = article.querySelector('.td-module-meta-info h3.entry-title.td-module-title a');
    //     const imageElement = article.querySelector('.td-image-container a.td-image-wrap span');
    //     const timeElement = article.querySelector('.td-editor-date time');
    //     return {
    //         title: aElement != null ? aElement.textContent : null,
    //         url: aElement != null ? aElement.getAttribute('href') : null,
    //         imageUrl: imageElement != null ? imageElement.getAttribute('data-img-url') : null,
    //         date: timeElement != null ? timeElement.textContent : null,
    //     }
    // }));
    const popularArticles = await page.$$eval('#tdi_32 .td-module-container', populars => populars.map(p => {
        const aElement = p.querySelector('.td-module-meta-info h3.entry-title.td-module-title a');
        const imageElement = p.querySelector('.td-image-container a.td-image-wrap span');
        const timeElement = p.querySelector('.td-editor-date time');

        return {
            title: aElement != null ? aElement.textContent : null,
            url: aElement != null ? aElement.getAttribute('href') : null,
            imageUrl: imageElement != null ? imageElement.getAttribute('data-img-url') : null,
            date: timeElement != null ? timeElement.textContent : null,
        };
    }));
    const latestArticles = await page.$$eval('#tdi_51 .td-module-container', latest => latest.map(l => {
        const aElement = l.querySelector('.td-module-meta-info h3.entry-title.td-module-title a');
        const imageElement = l.querySelector('.td-image-container a.td-image-wrap span');
        const timeElement = l.querySelector('.td-editor-date time');

        return {
            title: aElement != null ? aElement.textContent : null,
            url: aElement != null ? aElement.getAttribute('href') : null,
            imageUrl: imageElement != null ? imageElement.getAttribute('data-img-url') : null,
            date: timeElement != null ? timeElement.textContent : null,
        };
    }));

    // output
    console.log('pageTitle: %s\n\n', pageTitle);
    console.log('popular: %s\ncount: %d\n\n', popularArticles[0], popularArticles.length);
    console.log('latest: %s\ncount: %d\n\n', latestArticles[0], latestArticles.length);

    await browser.close();
})();
