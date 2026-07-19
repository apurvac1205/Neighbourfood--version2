import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async(req,res)=>{

try{

const{
name,
email,
password,
role,
city
}=req.body;

const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

if (!passwordRegex.test(password)) {

return res.status(400).json({

message:
"Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."

});

}

const existingUser=await User.findOne({
email
});

if(existingUser){

return res.status(400).json({
message:"Email already registered"
});

}

const hashedPassword = await bcrypt.hash(password,10);

const user = new User({

name: name.trim(),

email: email.trim().toLowerCase(),

password: hashedPassword,

role,

city: city.trim()

});

await user.save();

res.status(201).json(user);

}catch(error){

res.status(500).json({
message:error.message
});

}

};

export const loginUser=async(req,res)=>{

try{

const { email , password} = req.body;

const user = await User.findOne({
email: email.trim().toLowerCase()
});

if(!user){

return res.status(404).json({
message:"User not found"
});

}

const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch){

return res.status(400).json({
message:"Invalid password"
});

}

res.json(user);

}catch(error){

res.status(500).json({
message:error.message
});

}

};