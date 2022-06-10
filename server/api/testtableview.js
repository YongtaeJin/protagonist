require('dotenv').config();
const router = require('express').Router();
const testTableModel = require('./_model/goodman/testTableModel');
const { modelCall } = require('../../util/lib');

const oracledb = require('oracledb');



router.post('/', async (req, res) => {

    const rows = await modelCall (testTableModel.load, req, res);   

    //console.log(rows);

    res.json(rows);

});

module.exports = router;