import "./NGODashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../services/api";
import placeholder from "../../assets/images/food-placeholder.svg";
import emptyImage from "../../assets/images/empty.svg";

export default function NGODashboard() {

const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));

const [listings, setListings] = useState([]);
const [filtered, setFiltered] = useState([]);

const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");

const fetchListings = async () => {

try {

const res = await API.get("/listings/active");

setListings(res.data);
setFiltered(res.data);

} catch (err) {

console.log(err);

}

};

useEffect(() => {

fetchListings();

}, []);

useEffect(() => {

let data = listings;

if (category !== "All") {

data = data.filter(item => item.category === category);

}

if (search !== "") {

data = data.filter(item =>

item.title.toLowerCase().includes(search.toLowerCase()) ||

item.location.toLowerCase().includes(search.toLowerCase())

);

}

setFiltered(data);

}, [search, category, listings]);

const claimFood = async (id) => {

try {

const res = await API.post("/listings/claim", {

listingId: id

});

alert("Pickup Code : " + res.data.confirmationCode);

fetchListings();

} catch (err) {

alert("Already Claimed");

}

};

const logout = () => {

localStorage.removeItem("user");

navigate("/login");

};

return (

<div className="ngo-dashboard">

<Navbar />

<div className="ngo-container">

<div className="ngo-header">

<div>

<h1>

Welcome {user?.name} 👋

</h1>

<p>

Browse nearby surplus food listings.

</p>

</div>

<button
className="logout-btn"
onClick={logout}
>

Logout

</button>

</div>

<div className="filter-bar">

<input
type="text"
placeholder="Search food or location..."
value={search}
onChange={(e) => setSearch(e.target.value)}
/>

<select
value={category}
onChange={(e) => setCategory(e.target.value)}
>

<option>All</option>
<option>Meals</option>
<option>Bakery</option>
<option>Vegetables</option>
<option>Fruits</option>
<option>Dairy</option>
<option>Other</option>

</select>

</div>

<div className="listing-grid">

{filtered.length === 0 ? (

<div className="empty">

<img
src={emptyImage}
alt="No Listings"
/>

<h2>

No Listings Found

</h2>

<p>

There are currently no food listings available.

</p>

</div>

) : (

filtered.map(item => (

<div
key={item._id}
className="food-card"
>

<img
src={item.image || placeholder}
alt={item.title}
/>

<div className="food-content">

<h2>

{item.title}

</h2>

<span>

{item.category}

</span>

<p>

{item.description}

</p>

<div className="food-info">

<p>

💰 {item.price === 0 ? "Free" : `₹${item.price}`}

</p>
<p>

📍 {item.location}

</p>

<p>

⏰ {item.expiry}

</p>

<p>

👤 {item.vendorName}

</p>

</div>

<button
onClick={() => claimFood(item._id)}
>

Claim Food

</button>

</div>

</div>

))

)}

</div>

</div>

</div>

);

}