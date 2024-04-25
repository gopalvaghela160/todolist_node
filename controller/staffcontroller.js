var staffmodel = require('../model/staffmodel');
var task = require('../model/taskmodel');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const storage = require('node-persist');
storage.init( /* options ... */ );

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

    const check = await storage.getItem('login');
    if(check == undefined)
    {
        var data = await staffmodel.find({ email: req.body.email });

        if (data.length == 1) {
            bcrypt.compare(req.body.password, data[0].password, async (error , result) => {
                if (result == true) {
                    await storage.setItem('login',data[0]);
                    console.log('data',data[0]);
                    var token =  jwt.sign({ id: data[0].id }, 'token_key');
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
    }else{
        res.status(200).json({
            status:201,
            message:"all ready login"
        })

    }
}
exports.logout = async(req,res)=>{
    await storage.clear();
    res.status(200).json({
        status:201,
        message:"logout staff"
    })
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

//view task login staff wise
exports.viewtaskstaff = async(req,res)=>{
    const check = await storage.getItem('login');
    if(check != undefined)
    {
        const data = await task.find({staff_id :check._id}).populate('staff_id');
        if(data != undefined)
        {
            res.status(200).json({
                status:200,
                message:"task view successfully",
                data
            })
        }else{
            res.status(200).json({
                status:200,
                message:"task not found",
            })
        }
    }
    else{
        res.status(200).json({
            status:200,
            message:"plz login !",
        })
    }
} 
// accept task by staff
exports.accept  = async(req,res)=>{
     const check = await storage.getItem('login');
    if(check != undefined)
    {
        var id = req.params.id;
        req.body.status = "accept";
        const data = await task.findByIdAndUpdate(id,req.body);
        if(data != undefined)
        {
            res.status(200).json({
                status:200,
                message:"task accepted successfuly"
            })
        }
        else{
            res.status(201).json({
                status:201,
                message:"task not found"
            })
        }
    }
};
// decline task by staff
exports.decline  = async(req,res)=>{
     const check = await storage.getItem('login');
    if(check != undefined)
    {
        var id = req.params.id;
        req.body.status = "Decline";
        const data = await task.findByIdAndUpdate(id,req.body);
        if(data != undefined)
        {
            res.status(200).json({
                status:200,
                message:"task Decline successfuly"
            })
        }
        else{
            res.status(201).json({
                status:201,
                message:"task not found"
            })
        }
    }
};
// accept task by staff
exports.complated = async(req,res)=>{
     const check = await storage.getItem('login');
    if(check != undefined)
    {
        var id = req.params.id;
        req.body.status = "complated";
        const data = await task.findByIdAndUpdate(id,req.body);
        if(data != undefined)
        {
            res.status(200).json({
                status:200,
                message:"task complated successfuly"
            })
        }
        else{
            res.status(201).json({
                status:201,
                message:"task not found"
            })
        }
    }
};