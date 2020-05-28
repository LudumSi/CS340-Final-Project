
var express = require('express');
var mysq= require('./dbconfig.js')

var app = express()
var handlebars = require('express-handlebars').create({defaultLayout:'main'});




app.engine('handlebars', handlebars.engine);
app.set('view engine','handlebars');
app.set('port', process.argv[2]);

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
//
//   //Example:
//   //   var context = {};
//   //
//   //   mysql.pool.query('SELECT * FROM bsg_people', function(err, rows, fields){
//   // //	context.results = JSON.stringify(rows);
//   // 	res.render('displayTable',{data: rows});
//   // 	});
//
// });

app.use(express.static('public'));

app.get('*', function (req, res, next)
{
	res.status(404).render('404');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
