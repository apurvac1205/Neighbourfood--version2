import "./Login.css";
import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import loginImage from "../../assets/images/login.svg";
import {FaEye,FaEyeSlash} from "react-icons/fa";


const API = import.meta.env.VITE_API_URL;

export default function Login(){

const navigate=useNavigate();

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const[showPassword,setShowPassword]=useState(false);

const handleLogin=async(e)=>{

e.preventDefault();

try{

const res=await axios.post(`${API}/auth/login`,{
email,
password
});

const user=res.data;

localStorage.setItem("user",JSON.stringify(user));

if(user.role==="vendor"){

navigate("/vendor");

}else{

navigate("/ngo");

}

}catch(err){

alert(err.response?.data?.message||"Login Failed");

}

};

return(

<div className="login-page">

<div className="login-left">

<img src={loginImage} alt="Login"/>

</div>

<div className="login-right">

<div className="login-card">

<h1>Welcome Back</h1>

<p>

Sign in to continue using NeighbourFood.

</p>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<div className="password-field">

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button
type="button"
className="show-password-btn"
onClick={()=>setShowPassword(!showPassword)}
>

{showPassword ? <FaEyeSlash/> : <FaEye/>}

</button>

</div>

<button type="submit">

Login

</button>

</form>

<div className="login-links">

<span>

Don't have an account?

</span>

<Link to="/register">

Create Account

</Link>

</div>

</div>

</div>

</div>

);

}