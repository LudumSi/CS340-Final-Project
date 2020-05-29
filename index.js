var express = require('express');
var mysql = require('./dbconfig.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.use('/', express.static('public'));

app.get('/',function(req,res,next){
	res.render('index');
});

app.get('/index',function(req,res,next){
	res.render('index');
});

app.get('/home', function(req,res,next){
	res.render('home');
});

app.get('/profile', function(req,res,next){
	res.render('profile');
});

app.get('/browse', function(req,res,next){
	res.render('browse');
});

app.get('/editprofile', function(req,res,next){
	res.render('editprofile');
});

app.get('/enchant', function(req,res,next){
	res.render('enchant');
});



app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.get('*', function (req, res, next)
{
	res.status(404).render('404');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});


//Add specific ones here
// app.use('/classes', require('./classes.js'));
//
// app.use('/search', require('./search.js'));
//
// app.use('/admin', require('./admin.js'));
