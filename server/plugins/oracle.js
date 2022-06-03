require('dotenv').config();
const oracledb = require('oracledb');


oracledb.initOracleClient({ libDir: process.env.ORACLE_GOODMANCLI});
oracledb.autoCommit=true;
 
const oracleDbRelease = function(conn) {
	conn.release(function (err) {
	  if (err)
		console.log(err.message);
	});
  };
  
  function queryArray(sql, bindParams, options) {
	  //options.isAutoCommit = false; // we only do SELECTs
   
	  return new Promise(function(resolve, reject) {
		  oracledb.getConnection(
					{
					  user          :  process.env.ORACLE_GOODMANID,
					  password      :  process.env.ORACLE_GOODMANPW,
					  connectString :  process.env.ORACLE_GOODMANTNS					                   
				  })
		  .then(function(connection){
			  //console.log("sql log: " + sql + " params " + bindParams);
			  
			  connection.execute(sql, bindParams, options)
			  .then(function(results) {
				  resolve(results);
				  process.nextTick(function() {
					  oracleDbRelease(connection);
				  });
			  })
			  .catch(function(err) {
				  console.log(err);
				  reject(err);
   
				  process.nextTick(function() {
					  oracleDbRelease(connection);
						  });
					  });
			  })
			  .catch(function(err) {
				  reject(err);
			  });
	  });
  }
  
 async function queryObject(sql, bindParams, options) {
	  options['outFormat'] = oracledb.OBJECT; // default is oracledb.ARRAY
	  const data = await queryArray(sql, bindParams, options);
	  return data;
	  //console.log(data);
  }
  
  module.exports = queryArray; 
  module.exports.queryArray = queryArray; 
  module.exports.queryObject = queryObject;
