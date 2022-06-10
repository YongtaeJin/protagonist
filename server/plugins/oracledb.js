require('dotenv').config();
const oracledb = require('oracledb');
const dbConfig = require('../plugins/dbConfig.js');

oracledb.initOracleClient({ libDir: process.env.ORACLE_GOODMANCLI });
oracledb.autoCommit=true;
 

async function queryArray(sql, bindParams, options) {

	let connection;
	let result;

	try {
		oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
		connection = await oracledb.getConnection(dbConfig);
		result = await connection.execute(sql, bindParams, options);
	} catch (err) {
		console.error(err);
	} finally {
		if (connection) {
			try {
				// Connections should always be released when not needed				
				await connection.close();			
				if (sql.toLowerCase().indexOf('select') == 0) {
					return result.rows;
				} 
				else {					
					return result.rowsAffected;
				}				
				
		  	} catch (err) {
				console.error(err);
			}
		}
	}
	
};

async function queryObject(sql, bindParams, options) {
	const data = await queryArray(sql, bindParams, options);	
	return data;	
}
  
module.exports = queryArray; 
module.exports.queryArray = queryArray; 
module.exports.queryObject = queryObject;
