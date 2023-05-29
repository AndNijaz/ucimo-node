const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

let data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
let dataObj = JSON.parse(data);

dataObj = dataObj.map((el) => {
  el.id = slugify(el.productName, { lower: true });
  return el;
});

const server = http.createServer((req, res) => {
  // const pathname = req.url;
  const { pathname, query } = url.parse(req.url, true);
  // OVERVIEW
  if (pathname === "/" || pathname === "/overview") {
    // res.end("This is an OVERVIEW");
    res.writeHeader(200, {
      "Content-Type": "text/html",
    });
    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join();
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);
    // PRODUCT
  } else if (pathname === "/product") {
    res.writeHeader(200, { "Content-Type": "text/html" });

    // console.log(
    //   dataObj.findIndex(
    //     (obj) => slugify(obj.productName, { lower: true }) === query.id
    //   )
    // );
    const productHTML =
      dataObj[
        dataObj.findIndex(
          (obj) => slugify(obj.productName, { lower: true }) === query.id
        )
      ];

    const output = replaceTemplate(tempProduct, productHTML);
    res.end(output);
    // API
  } else if (pathname === "/api") {
    res.writeHeader(200, {
      "Content-Type": "application/json",
    });
    res.end(data);
    // 404
  } else {
    res.writeHeader(404, {
      "Content-Type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen("8000", "127.1.1.0", () => {});
