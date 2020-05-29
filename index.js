
var express = require('express');
var mysql = require('./dbconfig.js');

var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars');
app.engine('handlebars', handlebars());
app.set('view engine','handlebars');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json);

app.use('static', express.static('public'));
app.use('/', express.static('public'));

app.set('port', process.argv[2]);

app.set('mysql', mysql);

app.get('/', function(req, res){
	res.render('index');
});

//Add specific ones here
// app.use('/classes', require('./classes.js'));
//
// app.use('/search', require('./search.js'));
//
// app.use('/admin', require('./admin.js'));

app.use(function(req, res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');
});


// app.get('/',function(req,res,next){
//
//   // res.status(200).render('test-page')
//
//   //Can use handlebars to rend stuff from the database, eventually
//
//   //res.status(200).render('landing-page',{
//   //
//   //      Database bullshit
//   //
//   //});
// });


// app.get('*', function (req, res, next)
// {
// 	res.status(404).render('404');
// });

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
