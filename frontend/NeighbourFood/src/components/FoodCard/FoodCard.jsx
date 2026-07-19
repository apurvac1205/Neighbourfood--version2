import "./FoodCard.css";
import API from "../../services/api";

export default function FoodCard({
item,
onClaim,
isVendor,
fetchListings
}){

const handleDelete=async()=>{

try{

await API.delete(`/listings/${item._id}`);

fetchListings();

}catch(err){

alert("Unable to delete listing");

}

};

return(

<div className="food-card">

<img
src={item.image}
alt={item.title}
className="food-image"
/>

<div className="food-content">

<div className="top-row">

<h3>{item.title}</h3>

<span className="category">

{item.category}

</span>

</div>

<p className="description">

{item.description}

</p>

<div className="details">

<span>

💰 {item.price===0?"Free":`₹${item.price}`}

</span>

<span>

📍 {item.location}

</span>

</div>

<div className="details">

<span>

⏰ {item.expiry}

</span>

<span
className={
item.status==="available"
?"available"
:"claimed"
}
>

{item.status}

</span>

</div>

{isVendor?

<div className="buttons">

<button className="edit-btn">

Edit

</button>

<button
className="delete-btn"
onClick={handleDelete}
>

Delete

</button>

</div>

:

<button
className="claim-btn"
onClick={()=>onClaim(item._id)}
>

Claim Food

</button>

}

</div>

</div>

);

}