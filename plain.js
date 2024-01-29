'use strict';

const puppeter = require("puppeteer");

(async () => {
  console.log('loading...');

  const browser = await puppeter.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Navigate the page to a URL
  await page.goto('https://www.cnnindonesia.com/', {
    timeout: 10
  });

  const pageTitle = await page.title();

  await browser.close();
})();
