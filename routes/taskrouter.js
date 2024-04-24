var express = require('express');
var router = express.Router();
var task = require('../controller/taskcontroller');
/* GET home page. */
router.post('/',task.inserttask);
router.post('/all',task.gettask);
router.post('/one',task.getonetask);

module.exports = router;
