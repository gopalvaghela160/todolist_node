var staffmodel = require('../model/staffmodel');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
exports.insertstaff = async (req,res)=>{
    var b_pass = await bcrypt.hash(req.body.password, 10);
    req.body.password = b_pass;

    var data = await staffmodel.create(req.body);
    res.status(200).json({
        status:200,
        message:"staff registerd successfully",
        data
    })  
}

exports.login = async (req, res) => {

    var data = await staffmodel.find({ email: req.body.email });

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
                    message: "check email and password"
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
exports.view = async(req,res)=>{
    var data = await staffmodel.find();
    res.status(200).json({
        status:"all staff",
        data
    })
}
// single staff show
exports.getone = async(req,res)=>{
    var id = req.params.id;
    var data = await staffmodel.findById(id);
    res.status(200).json({
        status:"single staff show",
        data
    })
}
// update staff 
exports.updatestaff = async(req,res)=>{
    var id = req.params.id;
    var data = await staffmodel.findByIdAndUpdate(id,req.body);
    res.status(200).json({
        status:"update staff show",
        data    
    })
}
// delete staff 
exports.deletestaff = async(req,res)=>{
    var id = req.params.id;
    var data = await staffmodel.findByIdAndDelete(id);
    res.status(200).json({
        status:"delete staff show"
    })
}
