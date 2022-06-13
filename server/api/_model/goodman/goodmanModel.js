const db = require('../../../plugins/oracledb');
const sqlHelper = require('../../../../util/sqlHelper');

const goodmanModel = {
    async syTemp6Load(req, res) {        
        //const sql = `SELECT s_ser, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12, val13, val14, val15, val16, val17, val18, val19, val20, val21, val22, val23, val24, val25, val26, val27, val28, val29, val30, val31, val32, val33, val34, val35, val36, val37, val38, val39, val40, val41, val42, val43, val44, val45, val46, val47, val48, val49, val50
        const sql = `SELECT s_ser, val1, val2, val3, val4
                        FROM SY_TEMP6
                        ORDER BY  s_ser`;
        const data = db.queryObject(sql, [], []);
        return data;
    },    
    async syTemp6Save(req) {
        const data = req.body;
        
        const sql = sqlHelper.OracleInsert('SY_TEMP6', data);        
        const row = await db.queryObject(sql.query, sql.values, []);

        //console.log("결과", row);		
        //configModel.setConfigItem(data);
        return row;
    },
    async sytemp6Updtae(req) {
        const data = req.body;        
        const { S_SER } = data;        
        const sql = sqlHelper.OracleUpdate('SY_TEMP6', data, {S_SER});        
        const row = await db.queryObject(sql.query, sql.values, []);
        return row;
    },
    async syTemp6Delete(req) {
        const s_ser = req.params;
        const sql = sqlHelper.OracleDeleteSimple('SY_TEMP6', s_ser);

        console.log('sql', sql);
        const row = await db.queryObject(sql.query, sql.values, []);
        return row;
    },
}
module.exports = goodmanModel;