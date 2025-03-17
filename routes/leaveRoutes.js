const express = require("express");
const LeaveRequest = require("../models/LeaveRequest");
const User = require("../models/User");

const router = express.Router();

// Apply for leave
router.post("/apply", async (req, res) => {
  const leaveRequest = new LeaveRequest(req.body);
  await leaveRequest.save();
  res.json({ message: "Leave request submitted", leave_id: leaveRequest._id });
});

// Approve leave (Only Manager)
router.put("/:id/approve", async (req, res) => {
  const { approved_by } = req.body;
  const manager= await User.findById(approved_by);
  if(!manager){
    return res.status(404).json({message:"Manager not found"});
  }
  if(manager.role!=="Manager"){
    return res.status(403).json({message:"Access denied. Only managers can approve leave requests."})
  }
  await LeaveRequest.findByIdAndUpdate(req.params.id, { status: "Approved", approved_by });
  res.json({ message: "Leave request approved" });
});

module.exports = router;
