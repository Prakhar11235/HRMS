const express = require("express");
const Attendance = require("../models/Attendance");

const router = express.Router();

// Mark attendance
router.post("/", async (req, res) => {
  const attendance = new Attendance(req.body);
  await attendance.save();
  res.json({ message: "Attendance marked", attendance_id: attendance._id });
});

module.exports = router;
