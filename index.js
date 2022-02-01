import puppeteer from "puppeteer";

const screenShot1 = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.youtube.com");
  await page.screenshot({ path: "youtube.png" });

  await browser.close();
};

const pdfUrl = "https://en.wikipedia.org/wiki/Bangladesh";

const createPdf = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(pdfUrl, {
    waitUntil: "networkidle2",
  });
  await page.pdf({ path: "bangladeshinfo.pdf", format: "a4" });

  await browser.close();
};

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://quotes.toscrape.com/");

  const quotes = await page.evaluate(() => {
    const quotesDiv = document.querySelectorAll(".quote");
    let quotesArray = [];

    quotesDiv.forEach((tagName, i) => {
      const quoteInfo = tagName.querySelectorAll("span");
      const mainQuote = quoteInfo[0];
      const author = quoteInfo[1];
      const authorName = author.querySelector("small");
      const link = author.querySelector("a");
      quotesArray.push({
        quote: mainQuote.innerText,
        authorName: authorName.innerText,
        authorBio: link.href,
      });
    });

    return quotesArray;
  });
  console.log(quotes);

  await browser.close();
})();
