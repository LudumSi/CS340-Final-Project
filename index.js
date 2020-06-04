var express = require('express');
var mysql = require('./dbconfig.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);

app.use(bodyParser.json());
//Basic Pages :) It is bad, I know, but eh it works and I don't wanna clean it lol
app.use('/static', express.static('public'));
app.use('/', express.static('public'));

app.get('/',function(req,res,next){
	res.render('index');
});

app.post('/addUser',function(req,res,next){

	if(req.body){
		var data = req.body;

		mysql.pool.query("SELECT username FROM blacksmith", function(err, result, fields){

			var name_free = true;

			for(var i = 0; i < result.length;i++){

				if(result[i].username == data.username) name_free = false;
			}

			if(name_free){
				var query = "INSERT blacksmith (username,password,fname,lname,dob,experience,kingdom,village) VALUES ('" +
					data.username + "','" +
					data.password + "','" +
					data.fname + "','" +
					data.lname + "','" +
					data.dob + "'," +
					data.experience + ",'" +
					data.kingdom + "','" +
					data.village + "');";

				console.log(query);
				mysql.pool.query(query,function(err, fields){if(err){throw err;}});

			}else{
				console.log("Username is repeated. Should find a way to let user know");
			}

		});
	}
});

app.get('/index',function(req,res,next){
	res.render('index');
});

app.get('/home',function(req,res,next){
	res.render('home');
});

app.get('/login',function(req,res,next){
	res.render('login');
});

var scripts = ['createAccount.js']
app.get('/newuser',function(req,res,next){
	res.render('newuser',{jsscripts: scripts});
});

app.get('/browse',function(req,res,next){
	res.render('browse');
});

app.get('/browseLoggedIn',function(req,res,next){
	res.render('browseLoggedIn');
});

app.get('/browseWeapons',function(req,res,next){
	res.render('browseWeapons');
});

app.get('/browseEnchantments',function(req,res,next){
	res.render('browseEnchantments');
});

app.get('/browseMaterials',function(req,res,next){
	res.render('browseMaterials');
});

app.get('/browseBlacksmiths',function(req,res,next){
	res.render('browseBlacksmiths');
});

app.get('/editprofile',function(req,res,next){
	res.render('editprofile');
});

//Database Time!!:
//Ex to test Database --> Puts all blacksmith's names into the console = WORKS
// mysql.pool.query("SELECT fname FROM blacksmith", function(err, result, fields){
// 	if(err) throw err;
// 	console.log(result);
// });

//Hold onto your hats boyos, this is going to get messy -P
app.get('/weapon',function(req,res,next){

	//mysql.pool.query('SELECT * from weapon JOIN wpn_mat ON (weapon.name =  wpn_mat.wpn_name) JOIN wpn_magic ON (weapon.name=wpn_magic.wpn_name) JOIN blacksmith ON (weapon.smth_id=blacksmith.id) GROUP BY name', function(err, weapon, fields){
		mysql.pool.query('SELECT name, type, cost FROM weapon', function(err, weapon_names, fields){

			mysql.pool.query('SELECT wpn_name, mat_name FROM wpn_mat', function (err, wpn_mats, fields){

				mysql.pool.query('SELECT * FROM wpn_magic', function (err, wpn_magics, fields){

					mysql.pool.query('SELECT name,fname,lname FROM weapon JOIN blacksmith ON (weapon.smth_id=blacksmith.id) GROUP BY name', function (err, smith_names, fields){

						//console.log(wpn_mats);
						weapon_data = [];

						for(var i = 0;i < weapon_names.length;i++){
							var	weapon_packet = {};
							weapon_packet.name = weapon_names[i].name;
							weapon_packet.materials = [];
							weapon_packet.enchants = [];
							weapon_packet.type = weapon_names[i].type;
							weapon_packet.cost = weapon_names[i].cost;
							weapon_data.push(weapon_packet);
						}

						for(var i = 0;i < wpn_mats.length;i++){

							for(var j = 0;j < weapon_data.length;j++){

								if(wpn_mats[i].wpn_name == weapon_data[j].name){

									weapon_data[j].materials.push(wpn_mats[i].mat_name);
								}
							}
						}

						for(var i = 0;i < wpn_magics.length;i++){

							for(var j = 0;j < weapon_data.length;j++){

								if(wpn_magics[i].wpn_name == weapon_data[j].name){

									weapon_data[j].enchants.push(wpn_magics[i].magic_name);
								}
							}
						}

						for(var i = 0;i < smith_names.length;i++){

							for(var j = 0;j < weapon_data.length;j++){

								if(smith_names[i].name == weapon_data[j].name){

									weapon_data[j].fname = smith_names[i].fname;
									weapon_data[j].lname = smith_names[i].lname;
								}
							}
						}

						//console.log(weapon_data);
						res.render('weapon',{data: weapon_data})

					});

				});

			});

	});

});

app.get('/enchant',function(req,res,next){
  mysql.pool.query('SELECT * FROM enchantment JOIN wpn_magic ON (enchantment.name=wpn_magic.magic_name) JOIN magic_reqs ON (enchantment.name=magic_reqs.magic_name) GROUP BY name', function(err, enchantment, fields){
		res.render('enchant',{data: enchantment});
	});
});

app.get('/material',function(req,res,next){
  mysql.pool.query('SELECT * FROM material JOIN wpn_mat ON (material.name = wpn_mat.mat_name) GROUP BY name', function(err, materials, fields){
		res.render('material',{data: materials});
	});
});

app.get('/profile',function(req,res,next){
	mysql.pool.query('SELECT * FROM blacksmith', function(err, smiths, fields){
		mysql.pool.query('SELECT * FROM smth_specialty', function(err, smith_specs, fields){
			mysql.pool.query('SELECT name,smth_id FROM weapon', function(err, weapons,fields){
				mysql.pool.query('SELECT smth_id,mat_name FROM smth_own', function(err, mats,fields){
					mysql.pool.query('SELECT mentor,mentee FROM smth_training', function(err, train, fields){

						var smith_data = [];

						for(var i = 0;i < smiths.length;i++){

								var packet = {};
								packet.id = smiths[i].id;
								packet.fname = smiths[i].fname;
								packet.lname = smiths[i].lname;
								packet.village = smiths[i].village;
								packet.kingdom = smiths[i].kingdom;

								switch(smiths[i].experience){
									case 3:
										packet.experience = "Master";
										break;

									case 2:
										packet.experience = "Journeyman";
										break;

									default:
										packet.experience = "Apprentice";
								}

								packet.specialty = [];
								packet.materials = [];
								packet.weapons = [];
								packet.mentors = [];
								packet.mentees = [];

								smith_data.push(packet);
							}

							for(var i = 0; i < smith_specs.length; i++){

								for(var j = 0; j < smith_data.length; j++){

									if(smith_data[j].id == smith_specs[i].smth_id){
										smith_data[j].specialty.push(smith_specs[i].specialty);
									}
								}
							}

							for(var i = 0; i < weapons.length;i++){
								for(var j = 0;j < smith_data.length;j++){

									if(smith_data[j].id == weapons[i].smth_id){
										smith_data[j].weapons.push(weapons[i].name);
									}
								}
							}

							for(var i = 0; i < mats.length;i++){
								for(var j = 0;j < smith_data.length;j++){

									if(smith_data[j].id == mats[i].smth_id){
										smith_data[j].materials.push(mats[i].mat_name);
									}
								}
							}

							for(var i = 0; i < train.length;i ++){
								for(var j = 0;j < smith_data.length;j++){

									if(smith_data[j].id == train[i].mentee){
										for(var k = 0;k < smith_data.length;k++){
											if(smith_data[k].id == train[i].mentor){
												smith_data[j].mentors.push(smith_data[k].fname + " " + smith_data[k].lname);
											}
										}
									}

									if(smith_data[j].id == train[i].mentor){
										for(var k = 0;k < smith_data.length;k++){
											if(smith_data[k].id == train[i].mentee){
												smith_data[j].mentees.push(smith_data[k].fname + " " + smith_data[k].lname);
											}
										}
									}

								}
							}

							//console.log(smith_data);
							res.render('profile',{data: smith_data});

					});
				});
			});
		});
	});
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
