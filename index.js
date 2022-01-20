import express from "express";
import cheerio from "cheerio";
import axios from "axios";

const app = express();

const PORT = 5000;

const Url = "https://www.theguardian.com/international";

axios(Url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $(".fc-item__title", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
