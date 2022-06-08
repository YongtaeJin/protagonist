require('dotenv').config();
const router = require('express').Router();
const testTableModel = require('./_model/goodman/testTableModel');
const { modelCall } = require('../../util/lib');

const oracledb = require('oracledb');
const { json } = require('express');



//router.post('/', async (req, res) => {
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

    // 2022.06.08 주석 처리 
    //const aa = await modelCall (testTableModel.load, req, res);   

    //2022.06.08 DB 연결 재 확인 
    //oracledb.initOracleClient({ libDir: process.env.ORACLE_GOODMANCLI});
    //oracledb.autoCommit=true;
router.post('/', function (req, res) {    
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    oracledb.getConnection({
        user : "goodman",
        password : "goodman12",
        connectString : "goodman"
    },
    function(err, connection) {
        if(err) {
            console.error(err.message);
            return;
        }
        console.log('==> userlist seqrch quer');

        var query = 
            'SELECT D_OPENTIME, I_SYSTEM, I_WINDOW, N_WINDOW, I_USERID, N_USERNM, I_IP, I_MAC, D_UPDT, T_REMARK, I_MENU' +
            ' FROM SY_OPENLOG  where rownum < 10 ';
        
        // sql 실행
        connection.execute(query, function(err, result) {
            if (err) {
                console.error(err.message);

                doRelease(connection);
                return;
            }

            //console.log(result.rows);

            // Async, Promise적으로 처리 //
            doRelease(connection, result.rows);
        });
    });

    // DB연결 해제
    function doRelease(connection, userlist) {
        connection.close(function(err){
            if (err) {
                console.error(err.message);
            }

            // DB 종료까지 모두 완료 되었을 시 최종적으로 응답 데이터 변환
            console.log('list size: ' + userlist.length);

            for (var i=0; i<userlist.length; i++) {
                console.log('name: ' + userlist[i][1]);
            }
            //res.json(result.rows);
            //const rows = json(userlist);
            res.json(userlist);
        })
    };   
});

module.exports = router;