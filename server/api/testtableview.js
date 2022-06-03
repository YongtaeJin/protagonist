const router = require('express').Router();
const testTableModel = require('./_model/goodman/testTableModel');
const { modelCall } = require('../../util/lib');

router.get('/', async (req, res) => {
    //const sql = `SELECT D_OPENTIME, I_SYSTEM, I_WINDOW, N_WINDOW, I_USERID, N_USERNM, I_IP, I_MAC, D_UPDT, T_REMARK, I_MENU
    //  FROM SY_OPENLOG
    // WHERE I_SYSTEM = :i_system`
    
     // 두번째 인자 {i_system:'GOODMAN'} 또는 [i_system='GOODMAN', i_userid ='광진']
    //oracle.queryObject(sql, {i_system:'GOODMAN'}, {})
    //.then(function(result){
    //    console.log('Oracle Result OK!');
        //console.log(result.rows);
    //    res.json(result.rows);
        
    //})
    //.catch(function(err) {
        //nextTick(err);
    //    console.log(err.sql);
    //});
    await modelCall (testTableModel.load, req, res);
    
    

});


module.exports = router;