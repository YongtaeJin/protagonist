const db = require('../../plugins/mysql');
const sqlHelper = require('../../../util/sqlHelper');
const TABLE = require('../../../util/TABLE');
const { LV, isGrant } = require('../../../util/level');

const testTableViewModel = {
    async getList(req) {
        let where = {};
        const sql = sqlHelper.SelectSimple(TABLE.MEMBER, where, ['mb_name', 'mb_id', 'mb_provider', 'mb_birth', 'mb_email', 'mb_phone']);
        const [rows] = await db.execute(sql.query, sql.values);
        return rows;
    }
};

module.exports = testTableViewModel;
