const express = require('express');
const router = express.Router();
const axios = require('axios');
var fs = require('fs');


router.get("/", (req,res) => {
        console.log('inlogout')
        var json = {}
        json=JSON.stringify(json);
        fs.writeFile('./config.json', json, 'utf8', ()=>{
            res.redirect("/login");
        })
    })

module.exports = router;