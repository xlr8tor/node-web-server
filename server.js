var fs = require('fs');
var hbs =  require('hbs');
var express = require('express');
var app = express();

app.use((req,res,next)=>{
    res.render('maintenance.hbs')
})
app.use(express.static(__dirname + "/public"));
app.set('view engine','hbs');

app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    })
    next();
})

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})

app.get('/',(req,res) =>{
    res.render("home.hbs", {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    })
})

app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
    })
})

app.get('/bad',(req,res) =>{
    res.send({
        errorMessage: 'invalid request'
    })
})
app.listen(3000,() =>{
    console.log('server is running');
});