const oracle = require('../../../plugins/oracle');


const testTableModel = {
    async load(req, res) {        
        const sql = `SELECT D_OPENTIME, I_SYSTEM, I_WINDOW, N_WINDOW, I_USERID, N_USERNM, I_IP, I_MAC, D_UPDT, T_REMARK, I_MENU
                        FROM SY_OPENLOG
                       WHERE I_SYSTEM = :i_system  and rownum < 20
                       ORDER BY 1 DESC`;
        oracle.queryObject(sql, {i_system:'GOODMAN'}, {})
        .then(function(result){      
            //
            res.json(result.rows);
            //console.log(result.rows)      ;
            //return json(result.rows);

        })
        .catch(function(err) {
            //console.log(err);                   
        });        
    },
  
    
}
module.exports = testTableModel;