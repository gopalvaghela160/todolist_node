var express = require('express');
var router = express.Router();
var staff = require('../controller/staffcontroller');
/* GET users listing. */

router.post('/',staff.insertstaff);
router.post('/login',staff.login);
router.get('/view',staff.view);
router.get('/one/:id',staff.getone);
router.put('/update_user/:id',staff.updatestaff);
router.delete('/delete_user/:id',staff.deletestaff);

module.exports = router;
