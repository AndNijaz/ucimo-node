// const fs = require("fs");
// const http = require("http");

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we konw about the avocado: ${textIn}\nCrated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File writen");

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written!");
//       });
//     });
//   });
// });
// console.log("Will read file!");

// const server = http.createServer((req, res) => {
//   res.end("Puši kurac");
// });

// server.listen("8000", "127.1.1.0");

const fs = require("fs");

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  // console.log(data1);
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
  });
});
