var mysql = require('mysql');

var con = mysql.createConnection({
  host: "classmysql.engr.oregonstate.edu",
  user: "cs340_polktr",
  password: "Lacedeer03252000"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
