const express = require('express');
const router = express.Router();
const axios = require('axios');
var fs = require('fs');
var id = {}

router.post("/", (req,res) => {
    var url = req.body.url;
    axios.get(url+"/api/now/table/incident?sysparm_limit=1", {
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        auth: {
            username:req.body.username,
            password:req.body.password
        }
    }).then(function(response) {
        console.log(response)
        var json = {
            "url":url+"/api/now/table/incident",
            "username":req.body.username,
            "password":req.body.password
        }
        json=JSON.stringify(json);
        fs.writeFile('./config.json', json, (err)=>{
            id ={ "url":req.body.url,
            "username":req.body.username,
            "password":req.body.password}
            console.log(id)
            res.redirect("/index");
        });
        
    })
    .catch(function(error) {
        console.log(error);
        res.render("login", {invalid:true})
        // callback(error.response);
    })
} )

module.exports = {router,id};
