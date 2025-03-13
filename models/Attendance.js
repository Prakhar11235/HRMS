const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  date: String,
  check_in: String,
  check_out: String,
  status: { type: String, enum: ["Present", "Absent", "Half-day", "Leave"] },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
