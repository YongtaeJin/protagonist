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
    res.json(data);
});

router.post('/sytemp6Updtae', async (req, res) => {
    const data = await modelCall(goodmanModel.sytemp6Updtae, req);        
    res.json(data);
});

router.delete('/:S_SER', async (req,res) => {    
    const result = await modelCall(goodmanModel.syTemp6Delete, req);
    res.json(result);
});



module.exports = router;