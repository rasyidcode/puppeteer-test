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

  // Headline
  const headlineSelector = await page.waitForSelector('a[dtr-evt="headline"] h1', {
    timeout: 10
  });
  const headlineText = await headlineSelector.evaluate((el) => el.innerText);

  // Popular
  // const popularsSelector = await page.waitForSelector('div.overflow-y-auto.relative');
  // const populars = await popularsSelector.evaluate(function (elements) {
  //   elements.
  // });
  const popularsHandle = await page.$('div.overflow-y-auto.relative');
  const populars = await popularsHandle.$$eval('div.pl-9.mb-4.relative', nodes => nodes.map(n => {
    console.log('node: %s', n);
    return n.outerHTML;
  }));

  console.log(`pageTitle: %s`, pageTitle)
  console.log(`headline: ${headlineText}`);
  console.log(`populars: ${populars}`);

  await browser.close();
})();
