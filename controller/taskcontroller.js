var task = require('../model/taskmodel');
// add admin
exports.inserttask = async (req, res) => {

    var startdate = new Date().toISOString().slice(0, 10);    
    var enddate = new Date(req.body.end_date).toISOString().slice(0, 10);
    var totalday = Math.ceil((new Date(req.body.end_date) - new Date()) / (1000 * 60 * 60 * 24))

    req.body.start_date = startdate;
    req.body.end_date = enddate;
    req.body.total_day = totalday;


    const data = await task.create(req.body);
    res.status(200).json({
        status: "task added successfully",
        data
    })
}
// get all task show
exports.gettask = async (req,res)=>{
    var data = await task.find().populate("staff_id");
    res.status(200).json({
        status: "task view sucessfully",
        data
    })
}
// single task view
exports.getonetask = async (req,res)=>{
    var id = req.params.id;
    var data = await task.findById(id).populate("staff_id");
    res.status(200).json({
        status: "single task view sucessfully",
        data
    })
}