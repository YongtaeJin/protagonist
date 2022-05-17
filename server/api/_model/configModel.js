const db = require('../../plugins/mysql');
const sqlHelper = require('../../../util/sqlHelper');
const TABLE = require('../../../util/TABLE');
const { da } = require('vuetify/es5/locale');

const configModel = {
    async duplicateCheck({ field, value}) {
        const sql = sqlHelper.SelectSimple(
			TABLE.CONFIG,
			{ [field]: value },
			['COUNT(*) AS cnt']
		);
		const [[row]] = await db.execute(sql.query, sql.values);
		return row;        
    },

    async post(req) {
        const data = req.body;
        const sql = sqlHelper.InsertOrUpdate(TABLE.CONFIG, data);        
        const [row] = await db.execute(sql.query, sql.values);
        return data;
    },
};

module.exports = configModel;