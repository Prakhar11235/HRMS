const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  leave_type: { type: String, enum: ["Paid", "Sick"] },
  start_date: String,
  end_date: String,
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  applied_on: String,
  approved_by: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
