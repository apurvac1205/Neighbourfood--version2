import "./Register.css";
import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import registerImage from "../../assets/images/register.svg";
import {FaEye,FaEyeSlash} from "react-icons/fa";


const API = import.meta.env.VITE_API_URL;

export default function Register(){

const navigate=useNavigate();

const[form,setForm]=useState({
name:"",
email:"",
password:"",
city:"",
role:"vendor"
});

const[showPassword,setShowPassword]=useState(false);

const handleChange=(e)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};

const handleRegister=async(e)=>{

e.preventDefault();

const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

if (!passwordRegex.test(form.password)) {

alert(
"Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number and one special character."
);

return;

}

try{

const res=await axios.post(`${API}/auth/register`,form);

const user=res.data;

localStorage.setItem("user",JSON.stringify(user));

if(user.role==="vendor"){
navigate("/vendor");
}else{
navigate("/ngo");
}

}catch(err){

alert(err.response?.data?.message||"Registration Failed");

}

};

return(

<div className="register-page">

<div className="register-left">

<img
src={registerImage}
alt="Register"
/>

</div>

<div className="register-right">

<div className="register-card">

<h1>Create Account</h1>

<p>

Join NeighbourFood and start reducing food waste today.

</p>

<form onSubmit={handleRegister}>

<input
type="text"
name="name"
placeholder="Full Name / Organization"
value={form.name}
onChange={handleChange}
required
/>

<input
type="email"
name="email"
placeholder="Email Address"
value={form.email}
onChange={handleChange}
required
/>

<div className="password-field">

<input
type={showPassword ? "text" : "password"}
name="password"
placeholder="Password"
value={form.password}
onChange={handleChange}
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

<small className="password-note">
Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character.
</small>

<input
type="text"
name="city"
placeholder="City"
value={form.city}
onChange={handleChange}
required
/>

<select
name="role"
value={form.role}
onChange={handleChange}
>

<option value="vendor">

Food Vendor

</option>

<option value="ngo">

NGO / Shelter

</option>

</select>

<button type="submit">

Create Account

</button>

</form>

<div className="register-links">

<span>

Already have an account?

</span>

<Link to="/login">

Login

</Link>

</div>

</div>

</div>

</div>

);

}