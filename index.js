const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.send("HRMS API Running...");
});

app.use("/users", require("./routes/userRoutes"));
app.use("/leave-requests", require("./routes/leaveRoutes"));
app.use("/attendance", require("./routes/attendanceRoutes"));


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
