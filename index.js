const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const login = require('./routes/login');
const router2 = login.router;
const _ = require('underscore');
const id = require('./config.json')


const incidentapi = require('./routes/incidents')
const getposts = incidentapi.getposts;
const getpost = incidentapi.getpost;
const router1 = incidentapi.router;

const logout = require('./routes/logout');

const app = express();
const PORT = process.env.PORT || 5000;


//Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Login route
app.get('/login', (req, res)=> {
    res.render('login', {
        login:true
    });
})
app.get('/', (req,res) => {
    res.redirect('/login');
} )


//Homepage route
app.get('/index', (req,res) => {
    if(_.isEmpty(id)) {
        res.redirect('/login');
        return;
    }
    else{
    getposts(id,(data) => {
        if(data['status'] != 200) {
            res.send("Error: "+data['status']+". Try again later.")
        }
        else {
            res.render("index", {
                incidents: _.sortBy(data['data']['result'], function(o) {
                    var dt = new Date(o.sys_updated_on);
                    return -dt;})
            })
        }
    })
}
});

//Create Incident route
app.get('/create_incident', (req, res)=> {
    if(_.isEmpty(id)) {
        res.redirect('/login');
        return;
    }
    else res.render('create_incident');
})

//Info Route
app.get('/info', (req,res) => getpost(id,req.query.sys_id, (data)=> {
    if(_.isEmpty(id)) {
        res.redirect('/login');
        return;
    }
    else res.render("info", {
        incident: data['data']['result']
    })
}))
    
//Edit Route
app.get('/edit', (req,res) => getpost(id,req.query.sys_id, (data) => {
    if(_.isEmpty(id)) {
        res.redirect('/login');
        return;
    }
    else res.render("edit", {
        incident: data['data']['result']
    })
}));

//incident API routes
app.use('/incidents',router1);

//login API routes
app.use('/login',router2);

//logout API routes
app.use('/logout',logout);

//set static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));