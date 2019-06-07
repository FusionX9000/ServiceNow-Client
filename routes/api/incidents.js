const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config.js');

const url=config.url;
const username=config.username;
const password=config.password;


//get all incidents
function getposts(callback) {
    axios.get(url, {
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        auth: {
            username:username,
            password:password
        }
    }).then(function(response) {
        callback(response);
    })
    .catch(function(error) {
        console.log(error);
        return error.response;
    })
    
}
router.get('/', (req,res) => {
    getposts((data)=> {
        // console.log(data);
        res.json(data['data']['result']);
    })
})

//get incident
function getpost(sys_id,callback) {
    var new_url=url+'/'+sys_id;
    axios.get(new_url, {
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        auth: {
            username:username,
            password:password
        }
    }).then(function(response) {
        callback(response);
    })
    .catch(function(error) {
        console.log(error);
        return error.response;
    })
    
}

//create incident
function createposts(info, callback) {
    axios.post(url,info, {
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        auth: {
            username:username,
            password:password
        }
    }).then(function(response) {
        console.log(response)
        callback(response['data']['result']);
    })
    .catch(function(error) {
        console.log(error);
        return error.response;
    })
}

router.post('/', (req,res) => { 
    createposts(req.body, (data) => {
        res.redirect("/index");
    })
})

//modify incident
function modifyposts(sys_id,info, callback) {
    // var sys_id=info['sys_id'];
    // delete info['sys_id'];
    var new_url=url+'/'+sys_id;
    console.log(new_url,sys_id);
    axios.put(new_url,info, {
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        auth: {
            username:username,
            password:password
        }
    }).then(function(response) {
        console.log(response)
        callback(response['data']['result']);
    })
    .catch(function(error) {
        // console.log(error);
        return error.response;
    })
}

router.post('/edit', (req,res) => { 
    console.log(req.body)
    modifyposts(req.body.sys_id,req.body, (data) => {
        res.redirect("/index");
    })
})

//delete incident
function deletepost(sys_id,info, callback) {
    // var sys_id=info['sys_id'];
    // delete info['sys_id'];
    var new_url=url+'/'+sys_id;
    console.log(username,password)
    axios.delete(new_url, {
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        auth: {
            username:username,
            password:password
        }
    }).then(function(response) {
        console.log(response)
        callback(response['data']['result']);
    })
    .catch(function(error) {
        console.log(error);
        return error.response;
    })
}

router.get('/delete', (req,res) => {
    deletepost(req.query.sys_id,req.body, (data) => {
        res.redirect("/index");
    })
    console.log(req.query.sys_id);
});

module.exports = {
    router, getpost,getposts
}

