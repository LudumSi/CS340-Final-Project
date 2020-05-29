var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_polktr',
  password        : 'Lacedeer03252000',
  database        : 'cs340_polktr'
});

module.exports.pool = pool;
