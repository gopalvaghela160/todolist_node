var admin = require('../model/adminmodel');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


exports.insertadmin = async (req, res) => {
    var b_pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_pass;

    const data = await admin.create(req.body);
    res.status(200).json({
        status: "insert data"
    })
}


// select = find
exports.login = async (req, res) => {

    var data = await admin.find({ email: req.body.email });

    if (data.length == 1) {
        bcrypt.compare(req.body.password, data[0].password, async (error , result) => {
            if (result == true) {
                var token =  jwt.sign({ id: data[0].id }, 'token_key')
                res.status(200).json({
                    status: "login successfully",
                    token
                })
            }
            else {
                res.status(200).json({
                    status: 201,
                    message: "check1 email and password"
                })
            }
        })
    }
    else {
        res.status(200).json({
            status: "check email and password"
        })
    }
}