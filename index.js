"use strict";

// File System Module (Blocking Synchronous Way)
const fs = require('fs');
const http = require('http');
const url = require('url');

// File System //


// const text = fs.readFileSync('demo.txt', 'utf-8');
// console.log(text);

// const textUpload = `This Is What We Know About Avocado🥑 ${text}.\n CreatedOn ${Date.now()}`;
// fs.writeFileSync('demo.text', textUpload);
// console.log("File Uploaded");

// Asynchronous Way
// fs.readFile('start.txt','utf-8' , (err, data1) => {
//     if(err) return console.log("ERROR! 💣");

//     fs.readFile(`${data1}.txt`,'utf-8' , (err, data2) => {
//         console.log(data2);
//         fs.readFile('append.txt' ,'utf-8', (err, data3) =>{
//             console.log(data3)
//             fs.writeFile('.final.txt',`${data2}\n${data3}`,'utf-8', err => {
//                 console.log("Your File Uploaded 🍔");
//             })
//         });
//     })
// })
// console.log("read this file too!");



// Server Http //


// http.createServer((req, res) =>{
//     res.end("Hello From Jupyter!")
// }).listen(8000, '127.0.0.1', () => {
//     console.log('Success!');
// })

  const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`);
  const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`);
  const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`);
  const data = fs.readFileSync(`${__dirname}/dev-data/dev-data.json`,'utf-8')  

  const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    //Overview Page
    if(pathName === '/' || pathName === '/overview'){
        // fs.readFile(`${__dirname}/template/overview.html`, (err, data) => {
            // res.writeHead(200, {'Content-type': 'text/html'});
            // console.log(data);
            // res.end(data);
        // });
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(tempOverview);

    //Product Page
    }else if(pathName === '/api'){
        // fs.readFile(`${__dirname}/dev-data/dev-data.json`,'utf-8',(err, data) => {
        //     const productData = JSON.parse(data);
            // console.log(productData);
            // res.writeHead(200, {'Content-type': 'application/json'})

            res.writeHead(200, {'Content-type': 'text/html'})
            res.end(tempProduct);
        // });

    }else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Nothing is here.</h1>')
    }
    // res.end("Hello from the Jupyter!");
});

server.listen(8000, '127.0.0.1', () =>{
    console.log("Listening To request at Port 8000");
});