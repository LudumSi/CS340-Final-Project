var express = require('express');
var mysql = require('./dbconfig.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.use('/static', express.static('public'));
app.use('/', express.static('public'));

app.get('/',function(req,res,next){
	res.render('index');
});


//Database Time!!:
//Ex to test Database --> Puts all blacksmith's names into the console = WORKS
mysql.pool.query("SELECT fname FROM blacksmith", function(err, result, fields){
	if(err) throw err;
	console.log(result);
});

//Add specific ones here
// app.use('/classes', require('./classes.js'));
//
// app.use('/search', require('./search.js'));
//
// app.use('/admin', require('./admin.js'));


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
