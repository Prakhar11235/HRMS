const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Create a new user
router.post("/new", async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser=await User.findOne({email});
  if(existingUser){
    return res.status(400).json("User already exists.")
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();
  res.status(201).json({ message: "User created successfully", user_id: newUser._id });
});
//fetch all users
router.get("/all",async(req,res)=>{
  try{
    const users=await User.find();
    res.status(200).json(users);
  }catch(error){
    res.status(500).json({message:"Internal Server Error",error: error.message});
  }
});
//fetch user by id
router.get("/:id",async(req,res)=>{
  try{
    const user= await User.findById(req.params.id);
    if(!user){
      return res.status(404).json({message:"User not found."});
    }
    res.status(200).json(user);
  }catch(error){
    res.status(500).json({message:"Internal Server Error"});
  }
})
//fetch user by id and update
router.put("/:id",async(req,res)=>{
  const {name,email,role}=req.body;
  const updatedUser= await User.findByIdAndUpdate(
    req.params.id,
    {name,email,role},
    {new:true,runValidators:true}
  );
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User updated successfully", user: updatedUser });
});
//delete user by id
router.delete("/:id",async(req,res)=>{
  const deletedUser= await User.findByIdAndDelete(req.params.id);
  if(!deletedUser){
    return res.status(404).json({message:"Uset not found"});
  }
  res.status(200).json({ message: "User deleted successfully" });
});
//dashbaord data
router.get("/dashboard",async(req,res)=>{
  const month= parseInt(req.params.month);
  const birthdayEmp=await User.find({
    dob: { $regex: `-${month.toString().padStart(2, "0")}-` },
  }).select("name dob");
  const workAnniversaryEmployees = await User.find({
    joining_date: { $regex: `-${month.toString().padStart(2, "0")}-` }, // Matches "YYYY-MM-DD"
  }).select("name joining_date");
  res.status(200).json({
    birthdays: birthdayEmployees,
    work_anniversaries: workAnniversaryEmployees,
  });
})
module.exports = router;
