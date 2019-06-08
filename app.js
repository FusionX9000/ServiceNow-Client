const fs = require('fs')
const express = require('express');
const app = express();

app.get('*', function(req, res) {
    fs.readFile('./config.json', 'utf8', (err, jsonString) => {
        if (err) {
            res.redirect("/login")
            return;
        var jsonData
        }
        console.log('File data:', jsonString) 
    })
  });


