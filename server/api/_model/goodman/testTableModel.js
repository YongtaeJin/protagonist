const db = require('../../../plugins/oracledb');


const testTableModel = {
    async load(req, res) {        
        const sql = `SELECT D_OPENTIME, I_SYSTEM, I_WINDOW, N_WINDOW, I_USERID, N_USERNM, I_IP, I_MAC, D_UPDT, T_REMARK, I_MENU
                        FROM SY_OPENLOG
                       WHERE rownum < 12
                       ORDER BY 1 DESC`;

        const data = db.queryObject(sql, [], []);
        return data;
    },
  
    
}
module.exports = testTableModel;