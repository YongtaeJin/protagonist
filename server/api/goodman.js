require('dotenv').config();
const router = require('express').Router();
const goodmanModel = require('./_model/goodman/goodmanModel');
const { modelCall } = require('../../util/lib');

router.get('/sytemp6', async (req, res) => {
    const rows = await modelCall (goodmanModel.syTemp6Load, req, res);       
    res.json(rows);
});

router.post('/sytemp6Save', async (req, res) => {
    const data = await modelCall(goodmanModel.syTemp6Save, req);
    res.json('sytemp6Save 결과');
});



module.exports = router;