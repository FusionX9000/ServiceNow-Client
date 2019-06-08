const express = require('express');
const router = express.Router();
const axios = require('axios');
const login = require('../routes/login');

const id = require('../config.json')
const _ = require('underscore');


//get all incidents
function getposts(id,callback) {
    axios.get(id['url'], {
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        auth: {
            username:id['username'],
            password:id['password']
        }
    }).then(function(response) {
        console.log(response)
        callback(response);
    })
    .catch(function(error) {
        console.log(error);
        callback(error.response);
    })
    
}
router.get('/', (req,res) => {
    if(_.isEmpty(id)) {res.redirect('/login'); return;}
    else {getposts(id,(data)=> {
        // console.log(data);
        res.render('index',(data['data']['result']));
    })}
})

//get incident
function getpost(id,sys_id,callback) {
    var new_url=id['url']+'/'+sys_id;
    axios.get(new_url, {
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        auth: {
            username:id['username'],
            password:id['password']
        }
    }).then(function(response) {
        callback(response);
    })
    .catch(function(error) {
        // console.log(error);
        return error.response;
    })
    
}

//create incident
function createposts(id,info, callback) {
    axios.post(id['url'],info, {
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        auth: {
            username:id['username'],
            password:id['password']
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
    if(_.isEmpty(id)) {res.redirect('/login'); return;}
    else {createposts(id,req.body, (data) => {
        res.redirect("/index");
    })}
})

//modify incident
function modifyposts(id,sys_id,info, callback) {
    // var sys_id=info['sys_id'];
    // delete info['sys_id'];
    var new_url=id['url']+'/'+sys_id;
    // console.log(new_url,sys_id);
    axios.put(new_url,info, {
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        auth: {
            username:id['username'],
            password:id['password']
        }
    }).then(function(response) {
        // console.log(response)
        callback(response['data']['result']);
    })
    .catch(function(error) {
        // console.log(error);
        return error.response;
    })
}

router.post('/edit', (req,res) => { 
    if(_.isEmpty(id)) {res.redirect('/login'); return;}
    else{modifyposts(id,req.body.sys_id,req.body, (data) => {
        res.redirect("/index");
    })}
})

//delete incident
function deletepost(id, sys_id, callback) {
    // var sys_id=info['sys_id'];
    // delete info['sys_id'];
    var new_url=id['url']+'/'+sys_id;
    // console.log(id['username'],id['password']);
    axios.delete(new_url, {
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        auth: {
            username:id['username'],
            password:id['password']
        }
    }).then(function(response) {
        // console.log(response)
        callback(response['data']['result']);
    })
    .catch(function(error) {
        // console.log(error);
        return error.response;
    })
}

router.get('/delete', (req,res) => {
    if(_.isEmpty(id)) {res.redirect('/login'); return;}
    else {deletepost(id,req.query.sys_id,(data) => {
        res.redirect("/index");
    })}
    // console.log(req.query.sys_id);
});

module.exports = {
    router, getpost,getposts,id
}

