 const express = require('express');
 const hbs = require('hbs');
 const fs = require('fs');

 var app = express();
 hbs.registerPartials(__dirname + '/views/partials/');
 hbs.registerHelper('getCurrentYear', () => {
     return new Date().getFullYear();
 });
 hbs.registerHelper('screamIt', (text) => {
     return text.toUpperCase();
 })
 app.set('view engine', 'hbs');
 //Middleware express
 app.use(express.static(__dirname + '/public'));
 app.use((req, res, next) => {
     var now = new Date().toString();
     var log = `${now}  ${ req.method} ${req.url}`;
     fs.appendFile('server.log', log + '\n', (error) => {
         if (error) {
             console.log('unable to append to server.log file');
         }
     });
     console.log(log);
     next();
 });
 app.use((req, res, next) => {
     res.render('maintenance.hbs');
 });
 app.get('/', (req, res) => {
     //  res.send('<h1>hello express!</h1>');
     //  res.send({
     //      name: 'rimon',
     //      likes: [
     //          'biking',
     //          'cities'
     //      ]
     //  });
     res.render('home.hbs', {
         welcomeMessage: 'welcome to my website',
         pageTitle: 'about page',
         currentYear: new Date().getFullYear()
     })
 });

 app.get('/about', (req, res) => {
     //res.send('About page');
     res.render('about.hbs', {
         pageTitle: 'about page',
         currentYear: new Date().getFullYear()
     });
 });

 app.get('/bad', (req, res) => {
     res.send({
         errorMessage: 'error handling'
     });
 });


 app.listen(3000, () => {
     console.log('server listen on localhost:3000');
 });