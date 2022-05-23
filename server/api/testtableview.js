const router = require('express').Router();
const { modelCall } = require('../../util/lib');
const testTableViewModel = require('./_model/testTableViewModel');

router.get('/', async (req,res) => {
    const result = await modelCall(testTableViewModel.getList, req);
    res.json(result);
});

module.exports = router;