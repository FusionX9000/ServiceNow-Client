const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const _ = require('underscore')
const incidentapi = require('./routes/api/incidents')
const getposts = incidentapi.getposts;
const getpost = incidentapi.getpost;
const router = incidentapi.router;

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
app.get('/index', (req,res) => getposts( (data) => {
    res.render("index", {
        incidents: _.sortBy(data['data']['result'], function(o) {
            var dt = new Date(o.sys_updated_on);
            return -dt;})
    })
}));

//Incidents route
app.get('/incidents', (req, res)=> {
    res.render('incidents');
})

//Info Route
app.get('/info', (req,res) => getpost(req.query.sys_id, (data)=> {
    res.render("info", {
        incident: data['data']['result']
    })
}))
    
//Edit Route
app.get('/edit', (req,res) => getpost(req.query.sys_id, (data) => {
    res.render("edit", {
        incident: data['data']['result']
    })
}));

//incident API routes
app.use('/api/incidents',router);

//set static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));