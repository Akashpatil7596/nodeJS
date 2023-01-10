"use strict";

const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');


// File System //

//Synchronous Way
// const text = fs.readFileSync('./fs/demo.txt', 'utf-8');
// console.log(text);

// const textUpload = `This Is What We Know About Avocado🥑 ${text}.\n CreatedOn ${Date.now()}`;
// fs.writeFileSync('./fs/demo.text', textUpload);
// console.log("File Uploaded");
// 
// Asynchronous Way
// fs.readFile('.fs/start.txt','utf-8' , (err, data1) => {
//     if(err) return console.log("ERROR! 💣");

//     fs.readFile(`${data1}.txt`,'utf-8' , (err, data2) => {
//         console.log(data2);
//         fs.readFile('./fs/append.txt' ,'utf-8', (err, data3) =>{
//             console.log(data3)
//             fs.writeFile('./fs/final.txt',`${data2}\n${data3}`,'utf-8', err => {
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

  const dataObj = JSON.parse(data);

    const server = http.createServer((req, res) => {
        console.log(req.url);
        console.log(url.parse(req.url, true));
        const pathName = req.url;

    //Overview Page
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.toString().replace('{%PRODUCT_CARDS%}', cardsHtml);
        console.log(output);
        res.end(output);

    //Product Page
    }else if(pathName ==='/product'){
        res.end('This is Product!')
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