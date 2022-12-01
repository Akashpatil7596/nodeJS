"use strict";

// File System Module
const fs = require('fs');

const text = fs.readFileSync('demo.txt', 'utf-8');
console.log(text);

const textUpload = `This Is What We Know About Avocado🥑 ${text}.\n CreatedOn ${Date.now()}`;
fs.writeFileSync('demo.text', textUpload);
console.log("File Uploaded");
