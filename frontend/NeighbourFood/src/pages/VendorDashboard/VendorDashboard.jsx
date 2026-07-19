import "./VendorDashboard.css";
import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import {
FaPlus,
FaClipboardList,
FaCheckCircle,
FaBoxOpen,
FaSignOutAlt
} from "react-icons/fa";
import API from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import placeholder from "../../assets/images/food-placeholder.svg";

export default function VendorDashboard(){

const navigate=useNavigate();

const user=JSON.parse(localStorage.getItem("user"));

const[listings,setListings]=useState([]);

const[foodForm,setFoodForm]=useState({

title:"",
description:"",
category:"Meals",
price:0,
expiry:"",
location:"",
image:""

});

const fetchListings = async () => {

try {

const res = await API.get(

`/listings/vendor/${user.name}`

);

setListings(res.data);

} catch (err) {

console.log(err);

}

};

useEffect(()=>{

fetchListings();

},[]);

const handleChange=(e)=>{

setFoodForm({

...foodForm,
[e.target.name]:e.target.value

});

};

const handleSubmit=async(e)=>{

e.preventDefault();

try{

if (
!foodForm.title.trim() ||
!foodForm.description.trim() ||
!foodForm.category.trim() ||
foodForm.price === "" ||
!foodForm.expiry.trim() ||
!foodForm.location.trim() ||
!foodForm.image.trim()
) {

alert("Please fill in all the fields before adding a listing.");

return;

}

await API.post("/listings",{

vendorName:user.name,

title:foodForm.title,

description:foodForm.description,

category:foodForm.category,

price:Number(foodForm.price),

expiry:foodForm.expiry,

location:foodForm.location,

image:foodForm.image

});

setFoodForm({

title:"",
description:"",
category:"Meals",
price:0,
expiry:"",
location:"",
image:""

});

fetchListings();

alert("Listing Created");

}catch(err){

console.log(err);

}

};

const logout=()=>{

localStorage.removeItem("user");

navigate("/login");

};

const total=listings.length;

const available=listings.filter(item=>item.status==="available").length;

const claimed=listings.filter(item=>item.status==="claimed").length;

const handleDelete = async (id) => {

const confirmDelete = window.confirm(

"Delete this listing?"

);

if (!confirmDelete) return;

try {

await API.delete(`/listings/${id}`);

fetchListings();

} catch (err) {

console.log(err);

}

};

return(

<div className="dashboard">

<Navbar/>

<div className="dashboard-container">

<div className="dashboard-header">

<div>

<h1>

Welcome {user?.name} 👋

</h1>

<p>

Manage your surplus food listings.

</p>

</div>

<button
className="logout-btn"
onClick={logout}
>

<FaSignOutAlt/>

Logout

</button>

</div>

<div className="stats">

<div className="stat-card">

<FaClipboardList/>

<h2>

{total}

</h2>

<p>

Total Listings

</p>

</div>

<div className="stat-card">

<FaBoxOpen/>

<h2>

{available}

</h2>

<p>

Available

</p>

</div>

<div className="stat-card">

<FaCheckCircle/>

<h2>

{claimed}

</h2>

<p>

Claimed

</p>

</div>

</div>

<div className="listing-form">

<h2>

<FaPlus/>

Create Listing

</h2>

<form onSubmit={handleSubmit}>

<input

name="title"

placeholder="Food Title"

value={foodForm.title}

onChange={handleChange}

required

/>

<select

name="category"

value={foodForm.category}

onChange={handleChange}

>

<option>Meals</option>

<option>Bakery</option>

<option>Vegetables</option>

<option>Fruits</option>

<option>Dairy</option>

<option>Other</option>

</select>

<input

name="price"

type="number"

placeholder="Price"

value={foodForm.price}

onChange={handleChange}

/>

<input

name="expiry"

placeholder="Expiry"

value={foodForm.expiry}

onChange={handleChange}

/>

<input

name="location"

placeholder="Pickup Location"

value={foodForm.location}

onChange={handleChange}

/>

<input

name="image"

placeholder="Image URL"

value={foodForm.image}

onChange={handleChange}

/>

<textarea

name="description"

placeholder="Description"

value={foodForm.description}

onChange={handleChange}

/>

<button>

Post Listing

</button>

</form>

</div>

<div className="my-listings">

<h2>

My Listings

</h2>

<div className="listing-grid">

{

listings.map(item=>(

<div
key={item._id}
className="listing-card"
>

<img

src={item.image || placeholder}

alt={item.title}

/>

<div className="listing-content">

<h3>

{item.title}

</h3>

<span>

{item.category}

</span>

<p>

{item.description}

</p>

<div className="listing-info">

<p>

💰 {item.price === 0 ? "Free" : `₹${item.price}`}

</p>

<p>

📍 {item.location}

</p>

<p>

⏰ {item.expiry}

</p>

</div>

<div className="status">

{item.status==="available"?"Available":"Claimed"}

</div>

<div className="card-actions">

<button
className="delete-btn"
onClick={()=>handleDelete(item._id)}
>

Delete Listing

</button>

</div>

</div>

</div>

))

}

</div>

</div>

</div>

</div>

);

}