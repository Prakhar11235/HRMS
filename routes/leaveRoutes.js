const express = require("express");
const LeaveRequest = require("../models/LeaveRequest");

const router = express.Router();

// Apply for leave
router.post("/", async (req, res) => {
  const leaveRequest = new LeaveRequest(req.body);
  await leaveRequest.save();
  res.json({ message: "Leave request submitted", leave_id: leaveRequest._id });
});

// Approve leave (Only Manager)
router.put("/:id/approve", async (req, res) => {
  const { approved_by } = req.body;
  await LeaveRequest.findByIdAndUpdate(req.params.id, { status: "Approved", approved_by });
  res.json({ message: "Leave request approved" });
});

module.exports = router;
