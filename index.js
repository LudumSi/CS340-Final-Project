
//Note: Untested as of 5/21/2020, turns out all I needed to do was HTML :) Fuck my life

var express = require('express');
var exphbs = require('express-handlebars');

var app = express()
var port = process.env.PORT || 3000

app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

app.use(express.static('public'));

app.get('/',function(req,res){

  res.status(200).render('test-page')

  //Can use handlebars to rend stuff from the database, eventually

  //res.status(200).render('landing-page',{
  //
  //      Database bullshit
  //
  //});

});
